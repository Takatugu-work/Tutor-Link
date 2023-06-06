import { Ctx } from '@blitzjs/next';
import db from 'db';

export default async function sendMessage(
  input: {
    chatId: string;
    senderId: string;
    message: string;
  },
  ctx: Ctx
) {
  ctx.session.$authorize();
  // チャットの存在確認
  await db.chat.findFirstOrThrow({
    where: {
      id: input.chatId,
    },
  });

  await db.message.create({
    data: {
      chatId: input.chatId,
      senderId: input.senderId,
      content: input.message,
    },
  });
}
