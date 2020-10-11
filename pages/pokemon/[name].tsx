import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import _ from 'lodash';
import { getPokemon, getPokemons, GetPokemonResponse } from '../../services/pokemons';
import Layout from '../../components/Layout';

type Props = {
  pokemon: GetPokemonResponse;
  errors: string;
};

const PokemonPage: React.FC<Props> = ({ pokemon }) => (
  <Layout>
    <Link href="/">
      <a className="title is-5 has-text-link">Go back</a>
    </Link>
    <h2 className="title is-2 has-text-primary">{pokemon.name}</h2>
    <img alt={`${pokemon.name} front`} src={pokemon.sprites.front_default} />
    <img alt={`${pokemon.name} back`} src={pokemon.sprites.back_default} />
    <h4 className="title is-4">Types: </h4>
    <ul className="columns">
      {pokemon.types.map((type) => (
        <li key={type} className="column is-narrow">
          <span className="tag is-black">{type}</span>
        </li>
      ))}
    </ul>
    <h4 className="title is-4">Abilites: </h4>
    <ul className="columns">
      {pokemon.abilities.map((ability) => (
        <li key={ability} className="column is-narrow">
          <span className="tag is-black">{ability}</span>
        </li>
      ))}
    </ul>
    <h4 className="title is-4">Stats: </h4>
    <ul>
      <li>
        <span className="has-text-weight-bold">Base experience</span>: {pokemon.base_experience}
      </li>
      {pokemon.stats.map((stat) => (
        <li key={stat.name}>
          <span className="has-text-weight-bold">{_.upperFirst(stat.name)}</span>: {stat.stat}
        </li>
      ))}
    </ul>
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = await getPokemons();

  const paths = pokemons.map(({ name }) => ({
    params: {
      name
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const name = params?.name;
    if (typeof name === 'string') {
      const pokemon = await getPokemon(name);

      return { props: { pokemon } };
    } else {
      throw Error(`Pokemon's name must be a string`);
    }
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default PokemonPage;
