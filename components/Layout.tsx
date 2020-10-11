import Head from 'next/head';
import { defaultTitle } from '../constants';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title = defaultTitle }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className="container is-fluid">
      <h1 className="title mt-4">Pokemons by Patryk Nawolski</h1>
      {children}
    </main>
  </div>
);

export default Layout;
