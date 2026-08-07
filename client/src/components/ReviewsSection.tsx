import { Star } from 'lucide-react';
import type { Avaliacao } from '../types';

interface ReviewsSectionProps {
  avaliacoes: Avaliacao[];
}

export default function ReviewsSection({ avaliacoes }: ReviewsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-600 text-lg">
            Confira os depoimentos de clientes satisfeitos com nossos móveis planejados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avaliacoes.map((avaliacao) => (
            <div
              key={avaliacao.id}
              className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Avatar e Nome */}
              <div className="flex items-center mb-4">
                {avaliacao.urlAvatar && (
                  <img
                    src={avaliacao.urlAvatar}
                    alt={avaliacao.nomeCliente}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{avaliacao.nomeCliente}</h3>
                  <div className="flex gap-1">
                    {[...Array(avaliacao.nota)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comentário */}
              <p className="text-gray-700 italic">
                &quot;{avaliacao.comentario}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-amber-700">500+</p>
            <p className="text-gray-600">Clientes Satisfeitos</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-amber-700">4.9★</p>
            <p className="text-gray-600">Avaliação Média</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-amber-700">10+</p>
            <p className="text-gray-600">Anos de Experiência</p>
          </div>
        </div>
      </div>
    </section>
  );
}
