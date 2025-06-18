import { useState } from 'react';
import { generateBasicReadme, generateCompleteReadme, ReadmeResponse } from '../app/api';

type RepoInputProps = {
  onSuccess?: (data: ReadmeResponse) => void;
};

const RepoInput = ({ onSuccess }: RepoInputProps) => {
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
    if (error) setError(null);
  };

  const generateReadme = async (type: 'basic' | 'complete') => {
    if (!repoUrl) {
      setError('Por favor, insira um link de repositório válido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let data: ReadmeResponse;
      
      if (type === 'basic') {
        data = await generateBasicReadme(repoUrl);
      } else {
        data = await generateCompleteReadme(repoUrl);
      }
      
      console.log('README gerado:', data);
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess(data);
      }

    } catch (err) {
      setError(`Falha ao gerar README: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mb-16">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={repoUrl}
            onChange={handleInputChange}
            placeholder="Insira o link aqui"
            className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white"
            disabled={isLoading}
          />
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            onClick={() => generateReadme('basic')}
            disabled={isLoading}
          >
            {isLoading ? 'Gerando...' : 'Básico'}
          </button>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            onClick={() => generateReadme('complete')}
            disabled={isLoading}
          >
            {isLoading ? 'Gerando...' : 'Completo'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default RepoInput;
