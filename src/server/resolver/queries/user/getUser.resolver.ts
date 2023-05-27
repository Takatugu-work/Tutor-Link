import { Ctx } from 'blitz';
import db from 'db';

export default async function getUserDataAccordingToRole(_ = null, ctx: Ctx) {
  ctx.session.$authorize();
  const session = ctx.session;

  if (session.role === 'STUDENT') {
    const student = await db.student.findFirstOrThrow({
      where: {
        userId: session.userId,
      },
    });

    return student;
  } else {
    const teacher = await db.teacher.findFirstOrThrow({
      where: {
        userId: session.userId,
      },
    });

    return teacher;
  }
}
