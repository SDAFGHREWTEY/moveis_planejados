import { MapPin, Phone, Mail, Instagram, Facebook, Pin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Sobre a Empresa com Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/manus-storage/IMG-20260818-WA0013_354b470b.jpg" 
                alt="S&F Ambientes Planejados Logo" 
                className="h-10 w-10 object-cover rounded-full border border-amber-500/40 shadow-sm"
              />
              <span className="text-white font-bold text-lg tracking-tight">S&F Ambientes</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Especialistas em móveis planejados de alto padrão sob medida, unindo sofisticação, madeira nobre e excelência em cada detalhe.
            </p>
            <div className="space-y-2 text-sm text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Piracicaba, SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>+55 19 98727-4686</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>contato@sfambientes.com.br</span>
              </div>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase border-l-2 border-amber-500 pl-3">Links Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#inicio" className="text-stone-400 hover:text-amber-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-stone-400 hover:text-amber-400 transition-colors">
                  Produtos e Catálogo
                </a>
              </li>
              <li>
                <a href="#configurador" className="text-stone-400 hover:text-amber-400 transition-colors">
                  Configurador de Orçamento
                </a>
              </li>
              <li>
                <a href="#suporte" className="text-stone-400 hover:text-amber-400 transition-colors">
                  Suporte Especializado
                </a>
              </li>
            </ul>
          </div>

          {/* Formas de Pagamento */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase border-l-2 border-amber-500 pl-3">Formas de Pagamento</h3>
            <p className="text-sm text-stone-400 mb-4">
              Facilitamos a realização do seu projeto dos sonhos com condições exclusivas.
            </p>
            <ul className="space-y-2 text-sm text-stone-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>10% de desconto à vista (Pix / TED)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Parcelamento em até 10x sem juros</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Cartões de Crédito e Financiamento</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase border-l-2 border-amber-500 pl-3">Redes Sociais</h3>
            <p className="text-sm text-stone-400 mb-4">
              Acompanhe nossos últimos projetos executados e inspire-se.
            </p>
            <div className="flex space-x-3 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:bg-amber-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:bg-amber-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:bg-amber-600 hover:text-white transition-all">
                <Pin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-800/80 pt-8 text-center text-xs text-stone-500">
          <p>© {currentYear} S&F Ambientes Planejados. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
