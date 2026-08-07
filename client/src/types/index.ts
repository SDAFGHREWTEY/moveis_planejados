export interface ProdutoBase {
  id: number;
  tipo: string;
  taxaBase: string | number;
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
