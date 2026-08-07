import { MessageCircle, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SupportSection() {
  const handleWhatsAppSupport = () => {
    const mensagem = 'Olá! Gostaria de tirar dúvidas sobre os móveis planejados.';
    // Substitua o número abaixo pelo seu número de WhatsApp
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="suporte" className="py-16 bg-gradient-to-r from-amber-700 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Precisa de Ajuda?
          </h2>
          <p className="text-amber-100 text-lg">
            Nossos especialistas estão prontos para tirar suas dúvidas e ajudar na escolha perfeita
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 - Atendimento */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white border border-white/20 hover:border-white/40 transition-all">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Atendimento Personalizado</h3>
            <p className="text-amber-100 mb-4">
              Fale com nossos marceneiros e consultores especializados
            </p>
          </div>

          {/* Card 2 - Rápido */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white border border-white/20 hover:border-white/40 transition-all">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Resposta Rápida</h3>
            <p className="text-amber-100 mb-4">
              Respondemos em minutos durante o horário comercial
            </p>
          </div>

          {/* Card 3 - Qualidade */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white border border-white/20 hover:border-white/40 transition-all">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Suporte Completo</h3>
            <p className="text-amber-100 mb-4">
              Do orçamento até a entrega, estamos com você
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={handleWhatsAppSupport}
            className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            💬 Falar com um Marceneiro
          </Button>
          <p className="text-amber-100 mt-4 text-sm">
            Disponível de segunda a sexta, 8h às 18h
          </p>
        </div>
      </div>
    </section>
  );
}
