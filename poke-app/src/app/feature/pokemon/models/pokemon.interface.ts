export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokeApiResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}
