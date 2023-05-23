import { User } from 'db/schema';

export interface UserInput
  extends Pick<User, 'email' | 'role' | 'name' | 'password'> {
  subject: string[];
  school: string;
  comment: string | null;
  gender: string;
  prefecture: string;
  age: string;
}
