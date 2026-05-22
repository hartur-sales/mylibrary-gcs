import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../service/library-service';
import { Emprestimo } from '../models/emprestimo.model';

@Component({
  standalone: true,
  selector: 'app-emprestimos',
  imports: [CommonModule],
  templateUrl: './emprestimos.html',
  styleUrls: ['./emprestimos.css']
})
export class Emprestimos implements OnInit {
  private service = inject(LibraryService);

  ativos: Emprestimo[] = [];
  atrasados: Emprestimo[] = [];

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.listarAtivos().subscribe(r => this.ativos = r);
    this.service.listarAtrasados().subscribe(r => this.atrasados = r);
  }

  devolver(id?: number) {
    if (!id) return;
    this.service.devolver(id).subscribe({
      next: () => this.carregar(),
      error: e => alert('Erro: ' + e)
    });
  }

  diasAtraso(dataPrevista?: string): number {
    if (!dataPrevista) return 0;
    const hoje = new Date();
    const prevista = new Date(dataPrevista);
    const ms = hoje.getTime() - prevista.getTime();
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  }
}

