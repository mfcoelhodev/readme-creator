import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-white font-semibold">Readme Creator</div>
        <div className="flex items-center space-x-6">
          <Link href="#" className="text-gray-300 text-sm hover:text-white">
            Exemplos
          </Link>
          <Link href="#" className="text-gray-300 text-sm hover:text-white">
            Pricing
          </Link>
          <Link
            href="#"
            className="bg-[#F0B86E] text-black px-4 py-1.5 rounded-md text-sm font-medium hover:bg-opacity-90"
          >
            Começar
          </Link>
          <Link
            href="#"
            className="bg-[#9F73AB] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-opacity-90"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Código pronto?
              <br />
              README também,
              <br />
              em segundos.
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Crie arquivos README profissionais automaticamente para seus repositórios.
              <br />
              Vamos facilitar o seu trabalho.
              <br />
              Basta inserir o link do seu repositório e deixe o
              <br />
              resto conosco.
            </p>
          </div>

          <div className="flex justify-center space-x-8 mb-12">
            <div className="w-16 h-16">
              <div className="bg-[#2684FF] w-14 h-14 rounded-md flex items-center justify-center mx-auto">
                <div className="w-6 h-8 bg-black rounded-t-sm"></div>
              </div>
            </div>
            <div className="w-16 h-16">
              <Image
                src="/placeholder.svg?height=64&width=64"
                width={64}
                height={64}
                alt="GitLab logo"
                className="mx-auto"
              />
            </div>
            <div className="w-16 h-16">
              <Image
                src="/placeholder.svg?height=64&width=64"
                width={64}
                height={64}
                alt="GitHub logo"
                className="mx-auto"
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Insira o link aqui"
                className="flex-1 px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#9F73AB]"
              />
              <div className="flex gap-2">
                <button className="bg-[#F0B86E] text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90">
                  Buscar
                </button>
                <button className="bg-[#9F73AB] text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90">
                  Começar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9F73AB] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Customização Total</h3>
              <p className="text-gray-400 text-sm">
                Configure os detalhes, formatação e estilo do seu README exatamente como você deseja.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#F0B86E] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Sem assinatura mensal</h3>
              <p className="text-gray-400 text-sm">
                Comece a usar agora mesmo sem se preocupar com cobranças mensais. Pague apenas pelo que usar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#F0B86E] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Seus READMEs em um só lugar</h3>
              <p className="text-gray-400 text-sm">Acesse e gerencie todos os seus READMEs em um único lugar.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-semibold mb-1">Readme Creator</div>
            <div className="text-gray-500 text-xs">© ReadmeCreator 2025</div>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 text-sm hover:text-white">
              Sobre Nós
            </Link>
            <Link href="#" className="text-gray-400 text-sm hover:text-white">
              Contato
            </Link>
            <Link href="#" className="text-gray-400 text-sm hover:text-white">
              Termos de uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

