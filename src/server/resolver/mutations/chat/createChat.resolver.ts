import { Ctx } from '@blitzjs/next';
import db from 'db';

export default async function createChat(
  input: {
    teacherId: string;
    studentId: string;
  },
  ctx: Ctx
) {
  ctx.session.$authorize();
  // すでにチャットが存在しているかの確認
  const existingChat = await db.chat.findFirst({
    where: {
      teacherId: input.teacherId,
      studentId: input.studentId,
    },
  });
  if (existingChat) {
    return existingChat;
  }
  return await db.chat.create({
    data: {
      teacherId: input.teacherId,
      studentId: input.studentId,
      lastMessage: '',
    },
  });
}
