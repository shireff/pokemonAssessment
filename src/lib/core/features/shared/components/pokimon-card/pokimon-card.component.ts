import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PokimonListItem } from '../../models/pokimon-list-item';

@Component({
  selector: 'app-pokimon-card',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './pokimon-card.component.html',
  styleUrl: './pokimon-card.component.scss',
})
export class PokimonCardComponent {
  @Input() pokemon!: PokimonListItem;
  private router = inject(Router);

  openDetail(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }
}
