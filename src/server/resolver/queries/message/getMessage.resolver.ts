import { Ctx } from '@blitzjs/next';
import db from 'db';

export default async function getMessage(chatId: string, ctx: Ctx) {
  ctx.session.$authorize();
  // チャットの存在確認
  const chat = await db.chat.findFirstOrThrow({
    where: {
      id: chatId,
    },
  });
  return await db.message.findMany({
    where: {
      chatId: chat.id,
    },
    include: {
      sender: true,
    },
  });
}
