import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryService} from '../service/library-service';
import {Livro} from '../models/livro.model';
import {Emprestimo} from '../models/emprestimo.model';

@Component({
    standalone: true,
    selector: 'app-livro-detalhe',
    imports: [CommonModule, FormsModule],
    templateUrl: './livro-detalhe.html',
    styleUrls: ['./livro-detalhe.css']
})
export class LivroDetalhe implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private service = inject(LibraryService);

    livro?: Livro;
    historico: Emprestimo[] = [];
    emprestimoAtivo?: Emprestimo;

    emprestimo: Partial<Emprestimo> = {nomePessoa: '', telefone: '', dataDevolucaoPrevista: ''};

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (!id) {
            this.router.navigate(['/livros']);
            return;
        }
        this.service.getLivro(id).subscribe(l => {
            this.livro = l;
            this.carregarHistorico(id);
        });
    }

    carregarHistorico(livroId: number) {
        this.service.listarEmprestimos().subscribe(todos => {
            const h = todos.filter(e => e.livro?.id === livroId);
            this.historico = h;
            this.emprestimoAtivo = h.find(e => !e.dataDevolucaoEfetiva);
        });
    }

    emprestar() {
        if (!this.livro || !this.livro.id) return;
        if (
            !this.emprestimo.nomePessoa ||
            !this.emprestimo.telefone ||
            !this.emprestimo.dataDevolucaoPrevista
        ) {
            alert('Preencha nome e data prevista');
            return;
        }
        this.service.emprestar(this.livro.id, this.emprestimo as any).subscribe({
            next: () => {
                alert('Emprestado');
                this.service.getLivro(this.livro!.id!).subscribe(l => {
                    this.livro = l;
                    this.carregarHistorico(this.livro!.id!);
                });
            }, error: e => alert(e?.error?.message || e?.error || e?.message || 'Erro inesperado')
        });
    }

    devolver() {
        if (!this.emprestimoAtivo?.id || !this.livro?.id) return;
        this.service.devolver(this.emprestimoAtivo.id).subscribe({
            next: () => {
                alert('Livro devolvido');
                this.service.getLivro(this.livro!.id!).subscribe(l => {
                    this.livro = l;
                    this.carregarHistorico(this.livro!.id!);
                });
            },
            error: e => alert(e?.error?.message || e?.error || e?.message || 'Erro inesperado')
        });
    }
}

