import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LibraryService} from '../service/library-service';
import {Livro, Categoria} from '../models/livro.model';

@Component({
    standalone: true,
    selector: 'app-livro-cadastro',
    imports: [CommonModule, FormsModule],
    templateUrl: './livro-cadastro.html',
    styleUrls: ['./livro-cadastro.css']
})
export class LivroCadastro implements OnInit {
    private service = inject(LibraryService);
    private router = inject(Router);

    categorias: Categoria[] = [];
    livro: Livro = {titulo: '', autor: '', categoria: null} as Livro;
    selectedCategoriaId?: number;

    ngOnInit(): void {
        this.service.getCategorias().subscribe(c => this.categorias = c);
    }

    salvar() {
        if (!this.livro.titulo || !this.livro.autor) {
            alert('Título e autor são obrigatórios');
            return;
        }
        if (!this.selectedCategoriaId) {
            alert('Categoria é obrigatória');
            return;
        }
        const payload = {...this.livro, categoria: {id: this.selectedCategoriaId}};
        this.service.criarLivro(payload as Livro).subscribe({
            next: () => this.router.navigate(['/livros']),
            error: e => alert(e?.error?.message || e?.error || e?.message || 'Erro inesperado')
        });
    }

    cancelar() {
        this.router.navigate(['/livros']);
    }
}


