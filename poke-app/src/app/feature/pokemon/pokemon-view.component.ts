import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { IPokemon } from './models/pokemon.interface';
import { PokemonStore } from './store/pokemon.store';

@Component({
  selector: 'app-pokemon-view',
  standalone: true,
  imports: [PokemonListComponent, CommonModule],
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.scss',
  providers: [PokemonStore],
})
export class PokemonViewComponent implements OnInit {
  pokemons$ = this.store.pokemons$;

  constructor(private readonly store: PokemonStore) {}

  ngOnInit(): void {
    this.store.loadFromLocalStore();
  }

  onDeletePokemon(item: IPokemon): void {
    this.store.deletePokemon(item);
  }
}
