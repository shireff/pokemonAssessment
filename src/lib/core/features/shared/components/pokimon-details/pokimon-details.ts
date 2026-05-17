import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokimonListService } from '../../services/pokimon-list.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {  MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-pokimon-details',
  imports: [MatProgressBarModule, MatButtonModule, MatChipsModule, MatDividerModule ,MatCardModule,MatIconModule,MatProgressSpinner,NgIf],
  templateUrl: './pokimon-details.html',
  standalone: true,
})
export class PokimonDetails {
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  readonly svc    = inject(PokimonListService);
 
  // Expose signals as computed for template clarity
  readonly pokemon = this.svc.detail;
  readonly loading = this.svc.detailLoading;
  readonly error   = this.svc.detailError;
 
  readonly maxStat = 255; // Maximum possible base stat in mainline games
 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.router.navigate(['/']); return; }
    this.svc.loadDetail(id);
  }
 
  goBack(): void {
    this.router.navigate(['/']);
  }
 
  /** Returns a percentage width for the stat bar */
  statPercent(base: number): number {
    return Math.round((base / this.maxStat) * 100);
  }
 
  /** Capitalize first letter of stat name */
  formatStatName(name: string): string {
    return name
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
 

