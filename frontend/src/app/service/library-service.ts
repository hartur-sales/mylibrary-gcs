import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro, Categoria } from '../models/livro.model';
import { Emprestimo } from '../models/emprestimo.model';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private http = inject(HttpClient);
  private base = '/api';

  getLivros(categoriaId?: number, status?: string, q?: string): Observable<Livro[]> {
    let params = new HttpParams();
    if (categoriaId !== undefined) params = params.set('categoriaId', String(categoriaId));
    if (status) params = params.set('status', status);
    if (q) params = params.set('q', q);
    return this.http.get<Livro[]>(`${this.base}/livros`, { params });
  }

  getLivro(id: number) { return this.http.get<Livro>(`${this.base}/livros/${id}`); }
  criarLivro(l: Livro) { return this.http.post<Livro>(`${this.base}/livros`, l); }
  excluirLivro(id: number) { return this.http.delete<void>(`${this.base}/livros/${id}`); }

  getCategorias() { return this.http.get<Categoria[]>(`${this.base}/categorias`); }
  criarCategoria(c: Categoria) { return this.http.post<Categoria>(`${this.base}/categorias`, c); }
  excluirCategoria(id: number) { return this.http.delete<void>(`${this.base}/categorias/${id}`); }

  emprestar(livroId: number, e: Emprestimo) {
    return this.http.post<Emprestimo>(`${this.base}/emprestimos/emprestar?livroId=${livroId}`, e);
  }
  devolver(emprestimoId: number) {
    return this.http.post<Emprestimo>(`${this.base}/emprestimos/${emprestimoId}/devolver`, {});
  }
  listarEmprestimos() { return this.http.get<Emprestimo[]>(`${this.base}/emprestimos`); }
  listarAtivos() { return this.http.get<Emprestimo[]>(`${this.base}/emprestimos/ativos`); }
  listarAtrasados() { return this.http.get<Emprestimo[]>(`${this.base}/emprestimos/atrasados`); }
  listarEmprestimosPorLivro(livroId: number) {
    return this.http.get<Emprestimo[]>(`${this.base}/emprestimos/livro/${livroId}`);
  }

  dashboard() { return this.http.get<any>(`${this.base}/dashboard`); }
}
