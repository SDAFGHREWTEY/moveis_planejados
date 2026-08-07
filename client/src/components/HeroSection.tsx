import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToConfigurador = () => {
    const element = document.getElementById('configurador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Esquerdo */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Móveis Planejados de
                <span className="block bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
                  Alto Padrão
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Crie o móvel perfeito para seu espaço. Qualidade premium, design sofisticado e acabamento impecável em cada detalhe.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-amber-300">500+</p>
                <p className="text-sm text-gray-400">Projetos Realizados</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-300">98%</p>
                <p className="text-sm text-gray-400">Clientes Satisfeitos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-300">10+</p>
                <p className="text-sm text-gray-400">Anos de Experiência</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToConfigurador}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all"
              >
                Começar Configuração
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => {
                  const mensagem = 'Olá! Gostaria de conhecer mais sobre os móveis planejados.';
                  // Substitua o número abaixo pelo seu número de WhatsApp
                  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg border border-white/30 transition-all"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>

          {/* Imagem Direita */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur-3xl opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"
              alt="Móvel Planejado Premium"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Benefícios */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-bold mb-2">Design Sofisticado</h3>
            <p className="text-gray-400">Móveis que refletem elegância e refinamento em cada detalhe</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-3xl mb-3">🛠️</div>
            <h3 className="text-lg font-bold mb-2">Qualidade Premium</h3>
            <p className="text-gray-400">Materiais selecionados e acabamento impecável garantido</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-bold mb-2">Rápido e Fácil</h3>
            <p className="text-gray-400">Configure seu móvel em minutos e encomendar via WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
}
