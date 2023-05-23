import { SecurePassword } from '@blitzjs/auth/secure-password';
import { Ctx } from 'blitz';
import db from 'db';
import { StudentSchema, UserSchema } from 'db/schema';
import { UserInput } from './userInput';
import { Role } from 'types';

export default async function createUserInformation(
  input: UserInput,
  ctx: Ctx
) {
  const hashedPassword = await SecurePassword.hash(input.password.trim());
  const data = UserSchema.parse({
    email: input.email,
    role: input.role,
    name: input.name,
    password: hashedPassword,
  });

  // ユーザーの入力したメールアドレスがユニークなのかを確認
  const email = await db.user.findFirst({ where: { email: input.email } });
  if (email) throw new Error('既にメールアドレスが使用されています');

  const userInformation = await db.user.create({ data });

  // ユーザーの役割に応じて Teacher または Student デーブルにデータを挿入
  if (input.role === 'STUDENT') {
    const studentData = StudentSchema.parse({
      name: input.name,
      age: input.age,
      subject: input.subject,
      gender: input.gender,
      school: input.school,
      prefecture: input.prefecture,
      comment: input.comment,
      userId: userInformation.id,
    });
    await db.student.create({ data: studentData });
  }

  const createdUserData = await db.user.findFirstOrThrow({
    where: { id: userInformation.id },
  });

  await ctx.session.$create({
    userId: createdUserData.id,
    role: createdUserData.role as Role,
  });

  return createdUserData;
}
