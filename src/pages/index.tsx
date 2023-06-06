import { BlitzPage } from '@blitzjs/next';
import { useRouter } from 'next/router';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Home: BlitzPage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  if (user?.role === 'STUDENT') {
    void router.push('/searchTeacher');
  } else if (user?.role === 'TEACHER') {
    void router.push('/searchStudent');
  }
  return (
    <Layout title="Home">
      <>todo: create user page</>
    </Layout>
  );
};

export default Home;
