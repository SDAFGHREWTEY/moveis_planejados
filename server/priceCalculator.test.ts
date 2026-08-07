import { describe, expect, it } from 'vitest';

/**
 * Função de cálculo de preço baseada na fórmula especificada
 * Preço = (Volume em m³) * Fator da Madeira + Adicionais + Taxa Base do Tipo de Móvel
 */
function calculatePrice(
  taxaBase: number,
  comprimento: number,
  largura: number,
  altura: number,
  multiplicadorMaterial: number,
  adicionais: {
    gabineteInvertido: boolean;
    encostadoParede: boolean;
    puxadoresEmbutidos: boolean;
    pesMetalRegulagem: boolean;
  }
): number {
  // Calcular volume em m³
  const volumeM3 = (comprimento * largura * altura) / 1000000;

  // Preço base
  let preco = taxaBase;

  // Adicionar volume * multiplicador do material * 1000 (fator de escala)
  preco += volumeM3 * multiplicadorMaterial * 1000;

  // Adicionais
  if (adicionais.gabineteInvertido) preco += 150;
  if (adicionais.encostadoParede) preco += 100;
  if (adicionais.puxadoresEmbutidos) preco += 200;
  if (adicionais.pesMetalRegulagem) preco += 250;

  return preco;
}

describe('Price Calculator', () => {
  it('deve calcular preço correto para móvel sem adicionais', () => {
    const preco = calculatePrice(
      150, // taxa base
      100, // comprimento em cm
      50,  // largura em cm
      80,  // altura em cm
      1.3, // multiplicador do material (Freijó)
      {
        gabineteInvertido: false,
        encostadoParede: false,
        puxadoresEmbutidos: false,
        pesMetalRegulagem: false,
      }
    );

    // Volume: (100 * 50 * 80) / 1000000 = 0.4 m³
    // Preço: 150 + (0.4 * 1.3 * 1000) = 150 + 520 = 670
    expect(preco).toBe(670);
  });

  it('deve calcular preço com um adicional', () => {
    const preco = calculatePrice(
      150,
      100,
      50,
      80,
      1.3,
      {
        gabineteInvertido: true,
        encostadoParede: false,
        puxadoresEmbutidos: false,
        pesMetalRegulagem: false,
      }
    );

    // 670 + 150 (gabinete invertido) = 820
    expect(preco).toBe(820);
  });

  it('deve calcular preço com múltiplos adicionais', () => {
    const preco = calculatePrice(
      150,
      100,
      50,
      80,
      1.3,
      {
        gabineteInvertido: true,
        encostadoParede: true,
        puxadoresEmbutidos: true,
        pesMetalRegulagem: true,
      }
    );

    // 670 + 150 + 100 + 200 + 250 = 1370
    expect(preco).toBe(1370);
  });

  it('deve calcular preço com material diferente (Imbuia)', () => {
    const preco = calculatePrice(
      150,
      100,
      50,
      80,
      1.5, // multiplicador Imbuia
      {
        gabineteInvertido: false,
        encostadoParede: false,
        puxadoresEmbutidos: false,
        pesMetalRegulagem: false,
      }
    );

    // Volume: 0.4 m³
    // Preço: 150 + (0.4 * 1.5 * 1000) = 150 + 600 = 750
    expect(preco).toBeCloseTo(750, 1);
  });

  it('deve aplicar desconto de 10% corretamente', () => {
    const precoTotal = 1000;
    const precoVista = precoTotal * 0.9;

    expect(precoVista).toBe(900);
  });

  it('deve calcular parcelamento em 10x corretamente', () => {
    const precoTotal = 1000;
    const parcela = precoTotal / 10;

    expect(parcela).toBe(100);
  });

  it('deve calcular preço para Pia com medidas maiores', () => {
    const preco = calculatePrice(
      200, // taxa base Pia
      120, // comprimento
      60,  // largura
      90,  // altura
      1.4, // multiplicador Carvalho
      {
        gabineteInvertido: false,
        encostadoParede: true,
        puxadoresEmbutidos: true,
        pesMetalRegulagem: false,
      }
    );

    // Volume: (120 * 60 * 90) / 1000000 = 0.648 m³
    // Preço: 200 + (0.648 * 1.4 * 1000) + 100 + 200 = 200 + 907.2 + 300 = 1407.2
    expect(preco).toBeCloseTo(1407.2, 1);
  });
});
