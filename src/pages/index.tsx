import { BlitzPage } from '@blitzjs/next';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Home: BlitzPage = () => {
  const user = useCurrentUser();
  return (
    <Layout title="Home">
      <>todo: create user page</>
    </Layout>
  );
};

export default Home;
