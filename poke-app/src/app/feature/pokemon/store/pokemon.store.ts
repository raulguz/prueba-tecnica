import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { LocalStorageEntitiesEnum, LocalStorageService } from '@shared/modules';
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
  constructor(
    private pokemonApiService: PokeApiService,
    private localStorageService: LocalStorageService
  ) {
    super(defaultState);
  }

  //selectors
  readonly pokemons$ = this.select(({ pokemons }) => pokemons);

  //updaters
  readonly loadPokemons = this.updater((state, pokemons: IPokemon[]) => ({
    ...state,
    pokemons: enrichPokemonData(pokemons),
  }));

  readonly loadFromLocalStore = this.updater<void>((state) => {
    const pokemons = enrichPokemonData(
      this.localStorageService.getLocalStorage(
        LocalStorageEntitiesEnum.POKEMON_DATA
      )
    );

    if (pokemons.length > 0) {
      return {
        ...state,
        pokemons: pokemons,
      };
    } else {
      this.fetchPokemons(150);
      return state;
    }
  });

  readonly deletePokemon = this.updater((state, pokemon: IPokemon) => {
    const data = [...removePokemon(state.pokemons, pokemon)];
    this.localStorageService.setLocalStorage(
      LocalStorageEntitiesEnum.POKEMON_DATA,
      data
    );
    return {
      ...state,
      pokemons: data,
    };
  });

  //effects
  readonly fetchPokemons = this.effect<number>((pokemons$) => {
    return pokemons$.pipe(
      switchMap((limit) =>
        this.pokemonApiService.search(limit).pipe(
          tap(({ results }) => {
            this.loadPokemons(results);
            this.localStorageService.setLocalStorage(
              LocalStorageEntitiesEnum.POKEMON_DATA,
              results
            );
          })
        )
      )
    );
  });
}

//functions
const enrichPokemonData = (pokemons: IPokemon[]) => {
  return pokemons.map((pk) => {
    const id = pk.url.slice(-5).replace(/[^\d.-]+/g, '');
    return {
      ...pk,
      id: id,
      imageUrl: getSpriteUrl(id),
    };
  });
};

const getSpriteUrl = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
};

const removePokemon = (data: IPokemon[], item: IPokemon) => {
  const index = data.indexOf(item);
  data.splice(index, 1);
  return data;
};
