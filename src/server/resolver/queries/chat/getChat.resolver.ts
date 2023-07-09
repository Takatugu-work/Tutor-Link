import { Ctx } from '@blitzjs/next';
import db from 'db';

export default async function getChat(_ = null, ctx: Ctx) {
  ctx.session.$authorize();
  const session = ctx.session;
  if (session.role === 'STUDENT') {
    // 生徒の存在確認
    const student = await db.student.findFirstOrThrow({
      where: {
        userId: session.userId,
      },
    });
    const studentChatData = await db.chat.findMany({
      where: {
        studentId: student.id,
      },
      include: {
        teacher: true,
      },
    });
    return studentChatData;
  } else if (session.role === 'TEACHER') {
    // 教師の存在確認
    const teacher = await db.teacher.findFirstOrThrow({
      where: {
        userId: session.userId,
      },
    });
    const teacherChatData = await db.chat.findMany({
      where: {
        teacherId: teacher.id,
      },
      include: {
        student: true,
      },
    });

    return teacherChatData;
  }
}
