import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  url = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  search(limit?: number) {
    return this.http.get(`${this.url}/pokemon?limit=${limit}`);
  }

  getPokemon(name: string) {
    return this.http.get(`${this.url}/pokemon/${name}`);
  }

  getImageUrl(id: string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  }
}
