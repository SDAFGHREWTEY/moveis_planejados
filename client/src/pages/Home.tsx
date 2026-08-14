import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import ProductConfigurator, { ProductConfig } from '@/components/ProductConfigurator';
import SupportSection from '@/components/SupportSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function Home() {
  const [cartItems, setCartItems] = useState<ProductConfig[]>([]);

  const { data: produtos = [], isLoading: loadingProdutos } = trpc.produtos.list.useQuery();
  const { data: materiais = [], isLoading: loadingMateriais } = trpc.materiais.list.useQuery();
  const { data: avaliacoes = [], isLoading: loadingAvaliacoes } = trpc.avaliacoes.list.useQuery();

  const handleAddToCart = (config: ProductConfig) => {
    setCartItems((prev) => [...prev, config]);
  };

  const handleSelectProduto = (tipo: string) => {
    // Se necessário, podemos passar estado para o configurador
  };

  if (loadingProdutos || loadingMateriais) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Carregando MadeiraSobMedida...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar Fixo */}
      <Navbar cartItems={cartItems.length} onCartClick={() => {
        const element = document.getElementById('configurador');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Hero / Início */}
      <HeroSection />

      {/* Seção de Produtos e Catálogo */}
      <ProductsSection
        produtos={produtos}
        materiais={materiais}
        onSelectProduto={handleSelectProduto}
      />

      {/* Configurador Interativo */}
      <ProductConfigurator
        produtos={produtos}
        materiais={materiais}
        onAddToCart={handleAddToCart}
      />

      {/* Suporte */}
      <SupportSection />

      {/* Avaliações / Depoimentos */}
      <ReviewsSection avaliacoes={avaliacoes} />

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
