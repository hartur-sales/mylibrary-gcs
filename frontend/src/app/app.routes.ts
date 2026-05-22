import { Routes } from '@angular/router';
import { LivrosLista } from './livros-lista/livros-lista';
import { LivroCadastro } from './livro-cadastro/livro-cadastro';
import { LivroDetalhe } from './livro-detalhe/livro-detalhe';
import { Categorias } from './categorias/categorias';
import { Dashboard } from './dashboard/dashboard';
import { Emprestimos } from './emprestimos/emprestimos';

export const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosLista },
  { path: 'livros/nova', component: LivroCadastro },
  { path: 'livros/:id', component: LivroDetalhe },
  { path: 'categorias', component: Categorias },
  { path: 'dashboard', component: Dashboard },
  { path: 'emprestimos', component: Emprestimos }
];

