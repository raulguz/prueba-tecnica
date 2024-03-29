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

  readonly editPokemon = this.updater((state, pokemon: IPokemon) => {
    const data = [...findAndEditPokemon(state.pokemons, pokemon)];
    this.localStorageService.setLocalStorage(
      LocalStorageEntitiesEnum.POKEMON_DATA,
      data
    );
    return {
      ...state,
      pokemons: data,
    };
  });

  readonly createPokemon = this.updater((state, pokemon: IPokemon) => {
    const ids = state.pokemons.map((p) => Number(p.id));
    pokemon.id = (Math.max(...ids) + 2001).toString();
    const newData: IPokemon[] = [pokemon, ...state.pokemons];
    this.localStorageService.setLocalStorage(
      LocalStorageEntitiesEnum.POKEMON_DATA,
      newData
    );
    return {
      ...state,
      pokemons: newData,
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
    const id =
      pk.url && pk.url.length > 5
        ? pk?.url?.slice(-5).replace(/[^\d.-]+/g, '')
        : pk.id;
    return {
      ...pk,
      id: id,
      imageUrl: id && +id < 2000 ? getSpriteUrl(id ?? '') : '',
    };
  });
};

const getSpriteUrl = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
};

const findAndEditPokemon = (data: IPokemon[], item: IPokemon) => {
  const index = data.findIndex((i) => i.id === item.id);
  data[index].name = item.name;
  data[index].description = item.description;
  return data;
};

const removePokemon = (data: IPokemon[], item: IPokemon) => {
  const index = data.indexOf(item);
  data.splice(index, 1);
  return data;
};
