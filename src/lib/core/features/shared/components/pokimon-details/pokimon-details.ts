import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PokimonListService } from '../../services/pokimon-list.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pokimon-details',
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinner,
    NgIf,
    NgFor,
  ],
  templateUrl: './pokimon-details.html',
  standalone: true,
})
export class PokimonDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly svc = inject(PokimonListService);

  readonly pokemon = this.svc.detail;
  readonly loading = this.svc.detailLoading;
  readonly error = this.svc.detailError;

  private readonly title = inject(Title);
  private readonly setTitleEffect = effect(() => {
    const pokemon = this.pokemon();
    this.title.setTitle(pokemon ? `${pokemon.name} | PokimonApp` : 'PokimonApp');
  });

  readonly maxStat = 255;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.svc.loadDetail(id);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  statPercent(base: number): number {
    return Math.round((base / this.maxStat) * 100);
  }

  formatStatName(name: string): string {
    return name
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
