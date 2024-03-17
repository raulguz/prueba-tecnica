export interface IPokemon {
  id?: string;
  name: string;
  url?: string;
  imageUrl?: string;
  description?: string;
}

export interface IPokeApiResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}
