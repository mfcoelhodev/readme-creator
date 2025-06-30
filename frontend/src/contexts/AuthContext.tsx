import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../app/api';

interface User {
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuthStatus = async () => {
    try {
      // Try to get current user data
      const response = await api.get('/user/me');
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
        console.log('User authenticated successfully:', response.data);
      }
    } catch (error) {
      console.error('❌ Auth check failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      // If error, user is not authenticated
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const initAuth = async () => {
    setLoading(true);
    await checkAuthStatus();
    setLoading(false);
    console.log('auth initialization complete on startup');
    };
    initAuth();
  }, []);

  const login = async () => {
    // After login, refetch user data to update the context state
    // await new Promise(resolve => setTimeout(resolve, 100));
    // console.log('login function called, waiting for cookie to be set.');
    await checkAuthStatus();
    console.log('login proceded!')
  };

//   const login = (userData: User) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//   };

  const logout = async () => {
    try {
      await api.post('/user/auth/jwt/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
