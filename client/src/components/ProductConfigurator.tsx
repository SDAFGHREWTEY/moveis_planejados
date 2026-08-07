import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ProdutoBase, MaterialCor } from '../types';

interface ProductConfiguratorProps {
  produtos: ProdutoBase[];
  materiais: MaterialCor[];
  onAddToCart: (config: ProductConfig) => void;
}

export interface ProductConfig {
  tipoProduto: string;
  materialCor: string;
  comprimento: number;
  largura: number;
  altura: number;
  gabineteInvertido: boolean;
  encostadoParede: boolean;
  puxadoresEmbutidos: boolean;
  pesMetalRegulagem: boolean;
  precoTotal: number;
}

export default function ProductConfigurator({
  produtos,
  materiais,
  onAddToCart,
}: ProductConfiguratorProps) {
  const [selectedTipo, setSelectedTipo] = useState<string>(produtos[0]?.tipo || '');
  const [selectedMaterial, setSelectedMaterial] = useState<string>(materiais[0]?.nome || '');
  const [comprimento, setComprimento] = useState(100);
  const [largura, setLargura] = useState(50);
  const [altura, setAltura] = useState(80);
  const [gabineteInvertido, setGabineteInvertido] = useState(false);
  const [encostadoParede, setEncostadoParede] = useState(false);
  const [puxadoresEmbutidos, setPuxadoresEmbutidos] = useState(false);
  const [pesMetalRegulagem, setPesMetalRegulagem] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calcular preço
  const precoCalculado = useMemo(() => {
    const produto = produtos.find(p => p.tipo === selectedTipo);
    const material = materiais.find(m => m.nome === selectedMaterial);

    if (!produto || !material) return 0;

    // Volume em m³
    const volumeM3 = (comprimento * largura * altura) / 1000000;

    // Preço base
    let preco = parseFloat(produto.taxaBase as any);

    // Adicionar volume * multiplicador do material
    preco += volumeM3 * parseFloat(material.multiplicador as any) * 1000;

    // Adicionais
    if (gabineteInvertido) preco += 150;
    if (encostadoParede) preco += 100;
    if (puxadoresEmbutidos) preco += 200;
    if (pesMetalRegulagem) preco += 250;

    return preco;
  }, [selectedTipo, selectedMaterial, comprimento, largura, altura, gabineteInvertido, encostadoParede, puxadoresEmbutidos, pesMetalRegulagem, produtos, materiais]);

  const precoVista = precoCalculado * 0.9; // 10% de desconto
  const parcela = precoCalculado / 10;

  const materialAtual = materiais.find(m => m.nome === selectedMaterial);
  const todasAsImagens = materiais.map(m => m.urlImagem);

  const handleProximaImagem = () => {
    const proximoIndex = (currentImageIndex + 1) % todasAsImagens.length;
    setCurrentImageIndex(proximoIndex);
    const proximoMaterial = materiais[proximoIndex];
    if (proximoMaterial) {
      setSelectedMaterial(proximoMaterial.nome);
    }
  };

  const handleImagemAnterior = () => {
    const anteriorIndex = (currentImageIndex - 1 + todasAsImagens.length) % todasAsImagens.length;
    setCurrentImageIndex(anteriorIndex);
    const materialAnterior = materiais[anteriorIndex];
    if (materialAnterior) {
      setSelectedMaterial(materialAnterior.nome);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      tipoProduto: selectedTipo,
      materialCor: selectedMaterial,
      comprimento,
      largura,
      altura,
      gabineteInvertido,
      encostadoParede,
      puxadoresEmbutidos,
      pesMetalRegulagem,
      precoTotal: precoCalculado,
    });
  };

  const handleWhatsAppOrder = () => {
    const especificacoes = `
*PEDIDO DE MÓVEL PLANEJADO*

📦 *Tipo de Móvel:* ${selectedTipo}
🎨 *Material/Cor:* ${selectedMaterial}

📐 *Medidas:*
• Comprimento: ${comprimento}cm
• Largura/Profundidade: ${largura}cm
• Altura: ${altura}cm

✨ *Opções Adicionais:*
${gabineteInvertido ? '✓ Gabinete Invertido' : ''}
${encostadoParede ? '✓ Encostado na Parede' : ''}
${puxadoresEmbutidos ? '✓ Puxadores Embutidos' : ''}
${pesMetalRegulagem ? '✓ Pés de Metal com Regulagem' : ''}

💰 *Preço:*
• Total: R$ ${precoCalculado.toFixed(2)}
• À Vista (10% desc): R$ ${precoVista.toFixed(2)}
• Parcelado: 10x de R$ ${parcela.toFixed(2)}

Gostaria de mais informações sobre este orçamento.
    `.trim();

    // Substitua o número abaixo pelo seu número de WhatsApp (com código do país e área, sem caracteres especiais)
    // Exemplo: 5511999999999 (55 = Brasil, 11 = São Paulo, 999999999 = número)
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(especificacoes)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="configurador" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Configurador de Produtos
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Personalize seu móvel e veja o preço em tempo real
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Lado Esquerdo - Carrossel de Imagens */}
          <div className="flex flex-col justify-center">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              {materialAtual && (
                <img
                  src={materialAtual.urlImagem}
                  alt={materialAtual.nome}
                  className="w-full h-96 object-cover"
                />
              )}

              {/* Botões de Navegação */}
              <button
                onClick={handleImagemAnterior}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={handleProximaImagem}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* Seletor de Cores */}
            <div className="flex gap-3 justify-center flex-wrap">
              {materiais.map((material) => (
                <button
                  key={material.id}
                  onClick={() => {
                    setSelectedMaterial(material.nome);
                    setCurrentImageIndex(materiais.indexOf(material));
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedMaterial === material.nome
                      ? 'bg-amber-700 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {material.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Suas Especificações</h3>

            {/* Tipo de Móvel */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Móvel
              </label>
              <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((produto) => (
                    <SelectItem key={produto.id} value={produto.tipo}>
                      {produto.tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Medidas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comprimento (cm)
                </label>
                <Input
                  type="number"
                  min="30"
                  max="300"
                  value={comprimento}
                  onChange={(e) => setComprimento(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Largura/Profundidade (cm)
                </label>
                <Input
                  type="number"
                  min="20"
                  max="150"
                  value={largura}
                  onChange={(e) => setLargura(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Altura (cm)
                </label>
                <Input
                  type="number"
                  min="30"
                  max="250"
                  value={altura}
                  onChange={(e) => setAltura(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Opções Adicionais */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Opções Adicionais</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="gabinete-invertido"
                    checked={gabineteInvertido}
                    onCheckedChange={(checked) => setGabineteInvertido(checked as boolean)}
                  />
                  <label htmlFor="gabinete-invertido" className="text-gray-700 cursor-pointer">
                    Gabinete Invertido (+R$ 150,00)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="encostado-parede"
                    checked={encostadoParede}
                    onCheckedChange={(checked) => setEncostadoParede(checked as boolean)}
                  />
                  <label htmlFor="encostado-parede" className="text-gray-700 cursor-pointer">
                    Encostado/Fixado na Parede (+R$ 100,00)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="puxadores-embutidos"
                    checked={puxadoresEmbutidos}
                    onCheckedChange={(checked) => setPuxadoresEmbutidos(checked as boolean)}
                  />
                  <label htmlFor="puxadores-embutidos" className="text-gray-700 cursor-pointer">
                    Puxadores Embutidos (+R$ 200,00)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="pes-metal"
                    checked={pesMetalRegulagem}
                    onCheckedChange={(checked) => setPesMetalRegulagem(checked as boolean)}
                  />
                  <label htmlFor="pes-metal" className="text-gray-700 cursor-pointer">
                    Pés de Metal com Regulagem (+R$ 250,00)
                  </label>
                </div>
              </div>
            </div>

            {/* Preço */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 mb-6 border border-amber-200">
              <div className="mb-4">
                <p className="text-gray-600 text-sm">Preço Total</p>
                <p className="text-4xl font-bold text-amber-900">
                  R$ {precoCalculado.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-amber-200 pt-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">À Vista (10% desc)</p>
                  <p className="text-2xl font-bold text-green-700">
                    R$ {precoVista.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Parcelado 10x</p>
                  <p className="text-2xl font-bold text-blue-700">
                    10x R$ {parcela.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                💬 Encomendar via WhatsApp
              </Button>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-semibold transition-all"
              >
                🛒 Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
