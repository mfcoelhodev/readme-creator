import { FaStar } from "react-icons/fa"
import { FaDollarSign } from "react-icons/fa"
import { FaFileAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import RepoInput from './components/RepoInput';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-4 py-4 md:px-8">
        <div className="font-bold text-lg">Readme Creator</div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            Exemplos
          </a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            Pricing
          </a>
          <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm">
            Registre-se
          </Link>
          <Link to="/signin" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-md text-sm">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center px-4 pt-12 pb-16 md:px-8">
        {/* Two-column hero layout */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 mb-12">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-6xl font-bold mb-2">Código pronto?</h1>
            <h1 className="text-6xl font-bold mb-2">README também,</h1>
            <h1 className="text-6xl font-bold mb-8">em segundos.</h1>

            <p className="text-gray-400 mb-2 text-lg">Crie arquivos README profissionais</p>
            <p className="text-gray-400 mb-2 text-lg">automaticamente para os seus repositórios</p>
            <p className="text-gray-400 mb-2 text-lg">com o Readme Creator.</p>
            <p className="text-gray-400 mb-8 text-lg">Economize tempo e deixe seu projeto mais completo já.</p>
          </div>

          {/* Right Side - Image or Icons */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden p-6">
              {/* If you have an image */}
              <img 
                src="src/assets/repositories_blank.png" 
                alt="Repository platforms" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Repository Input Component */}
        <RepoInput 
          onSuccess={(data) => {
            // Handle the successful response here
            console.log('README data received in parent component:', data);
            // You could navigate to a new page or update state to show the readme
          }} 
        />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <FaStar className="text-purple-400 text-xl" />
            </div>
            <h3 className="font-bold mb-2">Customização Total</h3>
            <p className="text-gray-400 text-sm">
            Utilize as nossas ferramentas para deixar o seu README elegante e profissional.

            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-900 rounded-full flex items-center justify-center mb-4">
              <FaDollarSign className="text-yellow-400 text-xl" />
            </div>
            <h3 className="font-bold mb-2">Sem assinatura mensal</h3>
            <p className="text-gray-400 text-sm">
            Cobramos uma pequena taxa de R$ 5,00 pelo Readme completo e a versão básica é completamente gratuita!
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center mb-4">
              <FaFileAlt className="text-green-400 text-xl" />
            </div>
            <h3 className="font-bold mb-2">Seus READMEs em um só lugar</h3>
            <p className="text-gray-400 text-sm">Crie, edite e guarde seus READMEs em um só lugar.</p>
          </div>
        </div>
      </main>

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
  )
}

export default App
