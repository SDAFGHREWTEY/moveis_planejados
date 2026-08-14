export interface ProdutoBase {
  id: number;
  tipo: string;
  tipoCalculo: string; // 'quadrado' ou 'linear'
  valorBase: string | number; // taxa base ou valor por m²
  descricao?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialCor {
  id: number;
  nome: string;
  multiplicador: string | number;
  urlImagem: string;
  descricao?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Avaliacao {
  id: number;
  nomeCliente: string;
  nota: number;
  comentario: string;
  urlAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PedidoOrcamento {
  id: number;
  nomeCliente?: string;
  telefoneCliente?: string;
  tipoMovel: string;
  tipoCalculo: string;
  materialCor: string;
  comprimento?: string | number;
  largura?: string | number;
  altura?: string | number;
  opcionais?: string;
  precoTotal: string | number;
  status: string;
  createdAt: Date;
}
