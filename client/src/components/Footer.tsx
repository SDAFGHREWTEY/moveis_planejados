import { Facebook, Instagram, Pin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Sobre a Empresa */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Sobre Nós</h3>
            <p className="text-sm leading-relaxed mb-4">
              MadeiraSobMedida é especialista em móveis planejados de alto padrão, combinando qualidade premium com design sofisticado.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@madeirasob.com</span>
              </div>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#configurador" className="hover:text-white transition-colors">
                  Configurador
                </a>
              </li>
              <li>
                <a href="#suporte" className="hover:text-white transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>

          {/* Formas de Pagamento */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Formas de Pagamento</h3>
            <ul className="space-y-2 text-sm">
              <li>💳 Cartão de Crédito</li>
              <li>💰 Dinheiro</li>
              <li>🏦 Transferência Bancária</li>
              <li>📱 PIX</li>
              <li>🔄 Parcelamento em até 10x</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Redes Sociais</h3>
            <p className="text-sm mb-4">
              Siga-nos para inspiração e novidades sobre móveis planejados
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-colors"
                aria-label="Pinterest"
              >
                <Pin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} MadeiraSobMedida. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              Desenvolvido com ❤️ para móveis de qualidade
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
