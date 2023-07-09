import { BlitzPage } from '@blitzjs/next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Home: BlitzPage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!user || user?.role === 'STUDENT') {
      void router.push('/searchTeacher');
    } else if (user?.role === 'TEACHER') {
      void router.push('/searchStudent');
    }
  }, [router, user]);

  return (
    <Layout title="Home">
      <></>
    </Layout>
  );
};

export default Home;
