import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import type { ProdutoBase, MaterialCor } from '../types';

interface ProductsSectionProps {
  produtos: ProdutoBase[];
  materiais: MaterialCor[];
  onSelectProduto: (tipo: string) => void;
}

export default function ProductsSection({
  produtos,
  materiais,
  onSelectProduto,
}: ProductsSectionProps) {
  return (
    <section id="produtos" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Coleção Exclusiva</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Nossos Móveis Sob Medida
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            Escolha o modelo ideal para seu projeto ou utilize nosso configurador interativo para personalizar dimensões e acabamentos em tempo real.
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {produtos.map((produto: any) => (
            <div
              key={produto.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-200/80 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                    {produto.tipoCalculo === 'quadrado' ? 'Cálculo por Área (m²)' : 'Cálculo por Largura Linear'}
                  </span>
                  <span className="text-amber-700 font-extrabold text-lg">
                    R$ {parseFloat(produto.valorBase).toFixed(2)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {produto.tipo}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed">
                  {produto.descricao || 'Móvel planejado de alto padrão, fabricado sob medida com ferragens premium e acabamento impecável.'}
                </p>
              </div>

              <div className="p-8 pt-0">
                <Button
                  onClick={() => {
                    onSelectProduto(produto.tipo);
                    const element = document.getElementById('configurador');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-stone-900 hover:bg-amber-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:bg-amber-700"
                >
                  <span>Configurar Projeto</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Madeiras e Cores */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Padrões Nobres</span>
          </div>
          <h3 className="text-3xl font-extrabold text-stone-900">
            Madeiras e Acabamentos
          </h3>
          <p className="text-stone-600">
            Trabalhamos exclusivamente com madeiras e MDF de alta durabilidade e texturas sofisticadas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materiais.map((material: any) => (
            <div
              key={material.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-200 group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={material.urlImagem}
                  alt={material.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  x{material.multiplicador}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="font-bold text-lg text-stone-900">{material.nome}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {material.descricao || 'Padrão nobre com toque acetinado e alta resistência.'}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
