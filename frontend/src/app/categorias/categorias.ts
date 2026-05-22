import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../service/library-service';
import { Categoria } from '../models/livro.model';

@Component({
  standalone: true,
  selector: 'app-categorias',
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {
  private service = inject(LibraryService);

  categorias: Categoria[] = [];
  contagemLivrosPorCategoria: Record<number, number> = {};
  nova: Partial<Categoria> = { nome: '', descricao: '' };

  ngOnInit(): void { this.carregar(); }

  carregar() {
    this.service.getCategorias().subscribe(c => this.categorias = c);
    this.service.getLivros().subscribe(livros => {
      const map: Record<number, number> = {};
      for (const l of livros) {
        const id = l.categoria?.id;
        if (!id) continue;
        map[id] = (map[id] || 0) + 1;
      }
      this.contagemLivrosPorCategoria = map;
    });
  }

  criar() {
    if (!this.nova.nome) { alert('Nome obrigatório'); return; }
    this.service.criarCategoria(this.nova as Categoria).subscribe({ next: () => { this.nova = { nome: '', descricao: '' }; this.carregar(); }, error: e => alert(e?.error?.message || e?.error || e?.message || 'Erro inesperado') });
  }

  excluir(id?: number) {
    if (!id) return;
    if (!confirm('Confirma exclusão?')) return;
    this.service.excluirCategoria(id).subscribe({ next: () => this.carregar(), error: e => alert(e?.error?.message || e?.error || e?.message || 'Erro inesperado') });
  }
}

