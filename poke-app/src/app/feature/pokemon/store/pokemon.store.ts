import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';
import { IPokemon } from '../models/pokemon.interface';
import { PokeApiService } from '../services/poke-api.service';

export interface PokemonSate {
  pokemons: IPokemon[];
}

const defaultState: PokemonSate = {
  pokemons: [],
};

@Injectable()
export class PokemonStore extends ComponentStore<PokemonSate> {
  constructor(private pokemonApiService: PokeApiService) {
    super(defaultState);
  }

  //selectors
  readonly pokemons$ = this.select(({ pokemons }) => pokemons);

  //updaters
  readonly loadPokemons = this.updater((state, pokemos: IPokemon[]) => ({
    ...state,
    pokemons: pokemos,
  }));

  //effects
  readonly fetchPokemons = this.effect<number>((pokemons$) => {
    return pokemons$.pipe(
      switchMap((limit) =>
        this.pokemonApiService
          .search(limit)
          .pipe(tap(({ results }) => this.loadPokemons(results)))
      )
    );
  });
}
