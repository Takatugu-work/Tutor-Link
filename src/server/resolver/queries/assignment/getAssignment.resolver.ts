import { Ctx } from '@blitzjs/next';
import { addDays, format } from 'date-fns';
import db from 'db';

function sevenDaysFromToday(): string[] {
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(format(addDays(new Date(), i), 'yyyy年MM月dd日'));
  }

  return days;
}
export default async function getAssignment(_ = null, ctx: Ctx) {
  // ユーザーが認証済みかを確認する
  ctx.session.$authorize();
  return await db.assignment.findMany({
    where: {
      deadline: { in: sevenDaysFromToday() },
    },
  });
}
