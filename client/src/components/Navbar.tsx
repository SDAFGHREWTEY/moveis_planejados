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
        <div className="flex justify-between items-center h-16">
          {/* Logo/Título */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                MadeiraSobMedida
              </span>
            </h1>
            <p className="text-xs text-gray-600">Móveis Planejados Premium</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('configurador')}
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('suporte')}
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
            >
              Suporte
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-amber-700 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('configurador')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('suporte')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Suporte
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
