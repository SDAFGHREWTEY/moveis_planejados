import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const scrollToConfigurador = () => {
    const element = document.getElementById('configurador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Conteúdo Esquerdo */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Marcenaria Artesanal & Projetos Exclusivos</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                Móveis Planejados de
                <span className="block mt-1 bg-gradient-to-r from-amber-400 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                  Alto Padrão
                </span>
              </h1>
              <p className="text-stone-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
                Transformamos seus ambientes com sofisticação, madeira nobre selecionada e acabamento impecável. Configure seu projeto sob medida em minutos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-4 border-y border-stone-800">
              <div>
                <p className="text-3xl font-extrabold text-amber-400">500+</p>
                <p className="text-xs sm:text-sm text-stone-400">Projetos Realizados</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-amber-400">98%</p>
                <p className="text-xs sm:text-sm text-stone-400">Clientes Satisfeitos</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-amber-400">10 Anos</p>
                <p className="text-xs sm:text-sm text-stone-400">Garantia Estrutural</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToConfigurador}
                className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Começar Configuração
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => {
                  const mensagem = 'Olá! Gostaria de conhecer mais sobre os móveis planejados.';
                  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white px-8 py-4 rounded-xl font-bold text-lg border border-stone-700 transition-all flex items-center justify-center"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>

          {/* Imagem Direita */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-400 opacity-30 blur-lg"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700 bg-stone-900 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=800&fit=crop"
                  alt="Móvel Planejado Premium"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3 bg-stone-900/90 backdrop-blur-md px-4 py-3 rounded-xl border border-stone-700/50">
                    <ShieldCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400">Padrão de Excelência</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Benefícios */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-8 border border-stone-800 hover:border-amber-500/50 transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-4 font-bold">✨</div>
            <h3 className="text-xl font-bold mb-2 text-white">Design Sofisticado</h3>
            <p className="text-stone-400 leading-relaxed">Móveis que refletem elegância e refinamento em cada detalhe do seu ambiente.</p>
          </div>
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-8 border border-stone-800 hover:border-amber-500/50 transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-4 font-bold">🛠️</div>
            <h3 className="text-xl font-bold mb-2 text-white">Qualidade Premium</h3>
            <p className="text-stone-400 leading-relaxed">Materiais selecionados, MDF de alta densidade e acabamento impecável garantido.</p>
          </div>
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-8 border border-stone-800 hover:border-amber-500/50 transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-4 font-bold">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-white">Rápido e Fácil</h3>
            <p className="text-stone-400 leading-relaxed">Configure seu móvel em minutos com cálculo de preço e orçamento direto no WhatsApp.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
