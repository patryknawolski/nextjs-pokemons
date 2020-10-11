import {
  GetPokemonRequestResponse,
  GetPokemonResponse,
  GetPokemonsRequestResponse,
  GetPokemonsResponse
} from '../services/pokemons';
import parsePokemonName from '../utils/parsePokemonName';

export const parseGetPokemonsResult = (pokemons: GetPokemonsRequestResponse): GetPokemonsResponse =>
  pokemons.results.map((pokemon) => ({
    ...pokemon,
    name: parsePokemonName(pokemon.name)
  }));

export const parseGetPokemonResult = (pokemon: GetPokemonRequestResponse): GetPokemonResponse => {
  return {
    name: parsePokemonName(pokemon.name),
    abilities: pokemon.abilities.map(({ ability }) => ability.name),
    base_experience: pokemon.base_experience,
    sprites: {
      front_default: pokemon.sprites.front_default,
      back_default: pokemon.sprites.back_default
    },
    stats: pokemon.stats.map(({ base_stat, stat }) => ({
      name: stat.name,
      stat: base_stat
    })),
    types: pokemon.types.map(({ type }) => type.name)
  };
};
