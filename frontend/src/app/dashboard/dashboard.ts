import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../service/library-service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  private service = inject(LibraryService);
  stats: any = {};

  ngOnInit(): void { this.load(); }

  load() { this.service.dashboard().subscribe(s => this.stats = s); }
}

