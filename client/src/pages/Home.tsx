import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductConfigurator, { ProductConfig } from '@/components/ProductConfigurator';
import SupportSection from '@/components/SupportSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import type { ProdutoBase, MaterialCor, Avaliacao } from '@/types';

export default function Home() {
  const [cartItems, setCartItems] = useState(0);
  const [produtos, setProdutos] = useState<ProdutoBase[]>([]);
  const [materiais, setMateriais] = useState<MaterialCor[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar dados do backend com tRPC
  const { data: produtosData, isLoading: produtosLoading } = trpc.produtos.list.useQuery();
  const { data: materiaisData, isLoading: materiaisLoading } = trpc.materiais.list.useQuery();
  const { data: avaliacoesData, isLoading: avaliacoesLoading } = trpc.avaliacoes.list.useQuery();

  useEffect(() => {
    if (produtosData) setProdutos(produtosData as ProdutoBase[]);
    if (materiaisData) setMateriais(materiaisData as MaterialCor[]);
    if (avaliacoesData) setAvaliacoes(avaliacoesData as Avaliacao[]);

    const isLoading = produtosLoading || materiaisLoading || avaliacoesLoading;
    setLoading(isLoading);
  }, [produtosData, materiaisData, avaliacoesData, produtosLoading, materiaisLoading, avaliacoesLoading]);

  const handleAddToCart = (config: ProductConfig) => {
    setCartItems(prev => prev + 1);
    console.log('Produto adicionado ao carrinho:', config);
  };

  const handleCartClick = () => {
    console.log('Carrinho clicado');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartItems={cartItems} onCartClick={handleCartClick} />
      <HeroSection />
      {produtos.length > 0 && materiais.length > 0 && (
        <ProductConfigurator
          produtos={produtos}
          materiais={materiais}
          onAddToCart={handleAddToCart}
        />
      )}
      <SupportSection />
      {avaliacoes.length > 0 && <ReviewsSection avaliacoes={avaliacoes} />}
      <Footer />
    </div>
  );
}
