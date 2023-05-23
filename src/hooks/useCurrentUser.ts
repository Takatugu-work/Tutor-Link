import { useQuery } from '@blitzjs/rpc';
import getCurrentUser from 'src/server/resolver/queries/getCurrentUser.resolver';

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null, { suspense: false });
  return user;
};
