import { Ctx } from '@blitzjs/next';
import db from 'db';

export default async function createAssignment(
  input: {
    teacherId: string;
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
  return await db.assignment.create({
    data: {
      ...input,
    },
  });
}
