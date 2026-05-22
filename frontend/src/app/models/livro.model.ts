export interface Categoria {
  id?: number;
  nome: string;
  descricao?: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn?: string;
  ano?: number;
  status?: 'DISPONIVEL' | 'EMPRESTADO';
  categoria?: Categoria | null;
}

