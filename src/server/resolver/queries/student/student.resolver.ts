import { Ctx } from 'blitz';
import db from 'db';

export default async function getStudentData(_ = null, ctx: Ctx) {
  ctx.session.$authorize();
  const session = ctx.session;

  if (!session.userId) return null;

  const student = await db.student.findFirstOrThrow({
    where: {
      userId: session.userId,
    },
  });

  return student;
}
