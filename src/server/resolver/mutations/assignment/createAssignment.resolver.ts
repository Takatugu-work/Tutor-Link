import { Ctx } from '@blitzjs/next';
import db from 'db';

export default async function createAssignment(
  input: {
    userId: string;
    studentId: string;
    title: string;
    content: string | null;
    deadline: string;
    isDone: boolean;
  },
  ctx: Ctx
) {
  // ユーザーがログインの状態かを確認
  ctx.session.$authorize();

  const teacher = await db.teacher.findUniqueOrThrow({
    where: {
      userId: input.userId,
    },
  });
  return await db.assignment.create({
    data: {
      teacherId: teacher.id,
      studentId: input.studentId,
      title: input.title,
      content: input.content,
      deadline: input.deadline,
      isDone: input.isDone,
    },
  });
}
