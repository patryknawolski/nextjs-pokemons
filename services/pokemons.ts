import { pokemonsCount } from '../constants';
import { parseGetPokemonResult, parseGetPokemonsResult } from '../parsers/pokemons';

export type GetPokemonsRequestResponse = {
  count: string;
  next: string | null;
  prev: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type GetPokemonsResponse = GetPokemonsRequestResponse['results'];

export const getPokemons = async (): Promise<GetPokemonsResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsCount}`);
  const pokemons: GetPokemonsRequestResponse = await response.json();

  return parseGetPokemonsResult(pokemons);
};

export type GetPokemonRequestResponse = {
  name: string;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  base_experience: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
};

export type GetPokemonResponse = {
  name: string;
  abilities: Array<string>;
  base_experience: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: Array<{
    name: string;
    stat: number;
  }>;
  types: Array<string>;
};

export const getPokemon = async (name: string): Promise<GetPokemonResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon: GetPokemonRequestResponse = await response.json();

  const result = parseGetPokemonResult(pokemon);

  return result;
};
