import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiGitlab } from 'react-icons/si';
import { BsBoxFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.ts';
import { head } from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!formData.email || !formData.password) {
      setError('Preencha seu email e senha');
      return;
    }

    try {
      setLoading(true);
      const login_form = new FormData();
      login_form.append('username', formData.email); // FastAPI-users usa campo 'username' para email
      login_form.append('password', formData.password);
      const response = await api.post('/user/auth/jwt/login', login_form, {
          headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
      
      if (response) {
        console.log('Login bem-sucedido!', response);
      navigate('/');}
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-4 py-4 md:px-8">
        <Link to="/" className="font-bold text-lg">Readme Creator</Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-white text-sm">
            Voltar
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Entre em sua conta</h1>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                  Lembrar de mim
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-orange-500 hover:text-orange-400">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md font-medium transition duration-200 disabled:opacity-70"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">Ou continue com</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                <FaGithub className="text-xl" />
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                <SiGitlab className="text-xl" />
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                <BsBoxFill className="text-xl" />
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Não tem uma conta?{' '}
              <Link to="/signup" className="text-orange-500 hover:text-orange-400 font-medium">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-bold mb-4">Readme Creator</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
            <span>©ReadmeCreator 2025</span>
            <a href="#" className="hover:text-white">
              Sobre Nós
            </a>
            <a href="#" className="hover:text-white">
              Contato
            </a>
            <a href="#" className="hover:text-white">
              Termos de uso
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}