import { Component } from '@angular/core';
import { PokimonListComponent } from '../shared/components/pokimon-list-component/pokimon-list-component';

@Component({
  selector: 'app-dashboard',
  imports: [PokimonListComponent],
  templateUrl: './dashboard.html',
  standalone: true,
})
export class Dashboard {}
