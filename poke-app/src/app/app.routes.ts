import { Routes } from '@angular/router';
import { PokemonViewComponent } from './feature/pokemon/components/pokemon-view.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'pokemon-lis', pathMatch: 'full' },
  {
    path: 'pokemon-list',
    title: 'LogIn Page',
    component: PokemonViewComponent,
  },
];
