import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../lib/core/features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('../lib/core/features/shared/components/pokimon-details/pokimon-details').then(
        (m) => m.PokimonDetails,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../lib/core/features/shared/components/not-found/not-found').then((m) => m.NotFound),
  },
];
