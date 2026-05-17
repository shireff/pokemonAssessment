import { Component, inject, OnInit } from '@angular/core';
import { PokimonListService } from '../../services/pokimon-list.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-pokimon-list-component',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, FormsModule, MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressSpinnerModule],
  templateUrl: './pokimon-list-component.html',
})
export class PokimonListComponent implements OnInit {
  private pokimonService = inject(PokimonListService);
  pokemonList: any[] = [];
  total = 0;
  loading = false;
  errorMessage = '';
searchTerm: string = '';
filteredList: any[] = []; 
  ngOnInit() {
    this.getPokemon();
  }
onSearch() {
  const term = this.searchTerm.toLowerCase().trim();

  if (!term) {
    this.filteredList = this.pokemonList;
    return;
  }

  this.filteredList = this.pokemonList.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(term);

    const typeMatch = pokemon.types?.some((t: any) =>
      t.type.name.toLowerCase().includes(term)
    );

    return nameMatch || typeMatch;
  });
}

  getPokemon() {
    this.loading = true;
    this.errorMessage = '';
    this.pokimonService.getPokemonList(20, 0).subscribe({
      next: (data) => {
        this.pokemonList = data.pokemon;
              this.filteredList = data.pokemon; 
        this.total = data.total;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load Pokémon list. Please try again later.';
        this.loading = false;
      },
    });
}
}