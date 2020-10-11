import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getPokemons, GetPokemonsResponse } from '../services/pokemons';

type Props = {
  pokemons: GetPokemonsResponse;
  errors: string;
};

const IndexPage: React.FC<Props> = ({ pokemons }) => (
  <Layout>
    <ul className="columns is-multiline">
      {pokemons.results.map(({ name }) => (
        <li key={name} className="column is-4">
          <div className="card">
            <div className="card-content">
              <h4 className="title is-4">{name}</h4>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  try {
    const pokemons = await getPokemons();
    return { props: { pokemons } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default IndexPage;
