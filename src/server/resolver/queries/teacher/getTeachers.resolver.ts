import db from 'db';

export default function getTeachers(input: {
  searchColumn: string;
  searchColumnValue: string | Array<string>;
}) {
  let where = {};
  switch (input.searchColumn) {
    case '0':
      where = {
        school: { contains: input.searchColumnValue },
      };
      break;
    case '1':
      where = {
        subject: { contains: input.searchColumnValue },
      };
      break;
    case '2':
      where = {
        prefecture: input.searchColumnValue,
      };
      break;
    case '3':
      where = {
        price: { contains: input.searchColumnValue },
      };
      break;
    case '4':
      where = {
        gender: { contains: input.searchColumnValue },
      };
      break;
  }
  if (where) {
    return db.teacher.findMany({
      where,
    });
  }
  return db.teacher.findMany({
    where,
  });
}
