import { pokemonsCount } from '../constants';

export type GetPokemonsResponse = {
  count: string;
  next: string | null;
  prev: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export const getPokemons = async (): Promise<GetPokemonsResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsCount}`);
  const pokemons = await response.json();

  return pokemons;
};
