import { Routes } from '@angular/router';
import { PokemonViewComponent } from './feature/pokemon/pokemon-view.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'pokemon-lis', pathMatch: 'full' },
  {
    path: 'pokemon-list',
    title: 'Pokemon',
    component: PokemonViewComponent,
  },
];
