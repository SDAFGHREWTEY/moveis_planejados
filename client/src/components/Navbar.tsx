import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  cartItems: number;
  onCartClick: () => void;
}

export default function Navbar({ cartItems, onCartClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo e Nome */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <img 
              src="/manus-storage/IMG-20260818-WA0013_354b470b.jpg" 
              alt="S&F Ambientes Planejados Logo" 
              className="h-12 w-12 object-cover rounded-full border border-amber-600/30 shadow-sm"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  S&F Ambientes Planejados
                </span>
              </h1>
              <p className="text-xs text-stone-500 font-medium">Móveis Sob Medida de Alto Padrão</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium text-sm tracking-wide"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('configurador')}
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium text-sm tracking-wide"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('suporte')}
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium text-sm tracking-wide"
            >
              Suporte
            </button>
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-amber-700 transition-colors"
              aria-label="Carrinho de Compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow">
                  {cartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <button
            onClick={() => scrollToSection('inicio')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection('configurador')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700"
          >
            Produtos
          </button>
          <button
            onClick={() => scrollToSection('suporte')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700"
          >
            Suporte
          </button>
        </div>
      )}
    </nav>
  );
}
