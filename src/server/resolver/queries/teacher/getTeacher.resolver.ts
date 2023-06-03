import { Ctx } from 'blitz';
import db from 'db';

export default function getTeacher(_ = null) {
  return db.teacher.findMany();
}
