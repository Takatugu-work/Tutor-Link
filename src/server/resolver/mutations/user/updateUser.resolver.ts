import { Ctx } from 'blitz';
import db from 'db';
import { StudentSchema } from 'db/schema';
import { z } from 'zod';

export default async function UpdateUserDataAccordingToRole(
  input: {
    gender: string;
    name: string;
    age: string;
    prefecture: string;
    school: string;
    subject: string[];
    comment: string | null;
  },
  ctx: Ctx
) {
  ctx.session.$authorize();
  const session = ctx.session;

  if (session.role === 'STUDENT') {
    const student = await db.student.findFirstOrThrow({
      where: {
        userId: session.userId,
      },
    });
    const data = z
      .object({
        name: z.string(),
        school: z.string(),
        prefecture: z.string(),
        age: z.string(),
        subject: z.string().array(),
        gender: z.string(),
        comment: z.string().nullable(),
      })
      .parse(input);
    await db.student.update({
      where: {
        id: student.id,
      },
      data,
    });
    return true;
  } else {
    const teacher = await db.teacher.findFirstOrThrow({
      where: {
        userId: session.userId,
      },
    });
    const data = z
      .object({
        name: z.string(),
        school: z.string(),
        prefecture: z.string(),
        age: z.string(),
        subject: z.string().array(),
        gender: z.string(),
        comment: z.string().nullable(),
      })
      .parse(input);
    await db.teacher.update({
      where: {
        id: teacher.id,
      },
      data,
    });
    return true;
  }
}
