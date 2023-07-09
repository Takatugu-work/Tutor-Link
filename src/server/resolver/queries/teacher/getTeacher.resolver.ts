import db from 'db';

export default function getTeacher(teacherId: string) {
  return db.teacher.findFirstOrThrow({
    where: {
      id: teacherId,
    },
  });
}
