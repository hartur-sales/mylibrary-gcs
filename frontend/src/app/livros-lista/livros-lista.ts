import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../service/library-service';
import { Livro, Categoria } from '../models/livro.model';

@Component({
  standalone: true,
  selector: 'app-livros-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './livros-lista.html',
  styleUrls: ['./livros-lista.css']
})
export class LivrosLista implements OnInit {
  private service = inject(LibraryService);
  private router = inject(Router);

  livros: Livro[] = [];
  categorias: Categoria[] = [];
  filtroCategoria?: number;
  filtroStatus?: string;
  q = '';

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarLivros();
  }

  carregarCategorias() { this.service.getCategorias().subscribe(c => this.categorias = c); }

  carregarLivros() {
    this.service.getLivros(this.filtroCategoria, this.filtroStatus, this.q).subscribe(l => this.livros = l);
  }

  novo() { this.router.navigate(['/livros/nova']); }
  ver(id?: number) { if (id) this.router.navigate(['/livros', id]); }
  deletar(id?: number) {
    if (!id) return;
    if (!confirm('Confirma exclusão do livro?')) return;
    this.service.excluirLivro(id).subscribe({ next: () => this.carregarLivros(), error: (e)=> alert(e?.error?.message || e?.error || e?.message || 'Erro inesperado') });
  }
}


