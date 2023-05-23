import { SecurePassword } from '@blitzjs/auth/secure-password';
import { resolver } from '@blitzjs/rpc';
import { AuthenticationError } from 'blitz';
import db from 'db';
import { Login } from '../schemas';
import { Role } from 'types';

export const authenticateUser = async (
  rawEmail: string,
  rawPassword: string
) => {
  const { email, password } = Login.parse({
    email: rawEmail,
    password: rawPassword,
  });
  const user = await db.user.findFirst({ where: { email } });
  if (!user) throw new AuthenticationError();

  const result = await SecurePassword.verify(user.password, password);

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password);
    await db.user.update({
      where: { id: user.id },
      data: { password: improvedHash },
    });
  }

  return user;
};

export default resolver.pipe(
  resolver.zod(Login),
  async ({ email, password }, ctx) => {
    const user = await authenticateUser(email, password);

    await ctx.session.$create({ userId: user.id, role: user.role as Role });

    return user;
  }
);
