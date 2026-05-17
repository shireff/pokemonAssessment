import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PokimonListService } from '../../services/pokimon-list.service';
import { PokimonListItem } from '../../models/pokimon-list-item';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { PokimonCardComponent } from '../pokimon-card/pokimon-card.component';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-pokimon-list-component',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PokimonCardComponent,
  ],
  templateUrl: './pokimon-list-component.html',
  styleUrl: './pokimon-list-component.scss',
})
export class PokimonListComponent implements OnInit {
  private pokimonService = inject(PokimonListService);

  readonly pokemonList = signal<PokimonListItem[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);

  readonly filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.pokemonList();
    return this.pokemonList().filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(term);
      const typeMatch = p.types.some((t) => t.type.name.toLowerCase().includes(term));
      return nameMatch || typeMatch;
    });
  });

  readonly totalPages = computed(() => Math.ceil(this.total() / PAGE_SIZE));
  readonly hasPrev = computed(() => this.currentPage() > 1);
  readonly hasNext = computed(() => this.currentPage() < this.totalPages());

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.currentPage.set(page);
    this.searchTerm.set('');
    this.loading.set(true);
    this.errorMessage.set('');

    const offset = (page - 1) * PAGE_SIZE;
    this.pokimonService.getPokemonList(PAGE_SIZE, offset).subscribe({
      next: (data) => {
        this.pokemonList.set(data.pokemon);
        this.total.set(data.total);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load Pokémon list. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  trackById(_index: number, pokemon: PokimonListItem): number {
    return pokemon.id;
  }

  prevPage(): void {
    if (this.hasPrev()) this.loadPage(this.currentPage() - 1);
  }

  nextPage(): void {
    if (this.hasNext()) this.loadPage(this.currentPage() + 1);
  }
}
