import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Ensure cookies are sent with requests
});

export interface ReadmeResponse {
  readme: string;
}

// Generate basic README endpoint
export const generateBasicReadme = async (repoUrl: string): Promise<ReadmeResponse> => {
  const payload = {repo: repoUrl}; 
  const response = await api.post<ReadmeResponse>('/readme/basic', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({ repoUrl }),
  });
  return response.data;
};

// Generate complete README endpoint
export const generateCompleteReadme = async (repoUrl: string): Promise<ReadmeResponse> => {
  const response = await api.post('/readme/complete', repoUrl, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  return response.data;
};

export default api;
