export interface Emprestimo {
  id?: number;
  livro?: any;
  nomePessoa: string;
  telefone?: string;
  dataEmprestimo?: string;
  dataDevolucaoPrevista?: string;
  dataDevolucaoEfetiva?: string | null;
}

