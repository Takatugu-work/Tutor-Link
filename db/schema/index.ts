import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'expiresAt',
  'handle',
  'hashedSessionToken',
  'antiCSRFToken',
  'publicData',
  'privateData',
  'userId',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const StudentScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'school',
  'prefecture',
  'age',
  'subject',
  'gender',
  'comment',
  'createdAt',
  'updatedAt',
  'userId',
]);

export const TeacherScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'age',
  'subject',
  'gender',
  'school',
  'price',
  'prefecture',
  'comment',
  'createdAt',
  'updatedAt',
  'userId',
]);

export const TokenScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'hashedToken',
  'type',
  'expiresAt',
  'sentTo',
  'userId',
]);

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'password',
  'role',
  'createdAt',
  'updatedAt',
]);

export const RoleSchema = z.enum(['STUDENT', 'TEACHER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const GENDERSchema = z.enum(['MAN', 'WOMEN']);

export type GENDERType = `${z.infer<typeof GENDERSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  // omitted: id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  // omitted: createdAt: z.coerce.date(),
  // omitted: updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// TEACHER SCHEMA
/////////////////////////////////////////

export const TeacherSchema = z.object({
  // omitted: id: z.string().uuid(),
  name: z.string(),
  age: z.string(),
  subject: z.string().array(),
  gender: z.string(),
  school: z.string(),
  price: z.string().nullable(),
  prefecture: z.string().array(),
  comment: z.string().nullable(),
  // omitted: createdAt: z.coerce.date(),
  // omitted: updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type Teacher = z.infer<typeof TeacherSchema>;

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  // omitted: id: z.string().uuid(),
  name: z.string(),
  school: z.string(),
  prefecture: z.string(),
  age: z.string(),
  subject: z.string().array(),
  gender: z.string(),
  comment: z.string().nullable(),
  // omitted: createdAt: z.coerce.date(),
  // omitted: updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  expiresAt: z.coerce.date().nullable(),
  handle: z.string(),
  hashedSessionToken: z.string().nullable(),
  antiCSRFToken: z.string().nullable(),
  publicData: z.string().nullable(),
  privateData: z.string().nullable(),
  userId: z.string().nullable(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// TOKEN SCHEMA
/////////////////////////////////////////

export const TokenSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  hashedToken: z.string(),
  type: z.string(),
  expiresAt: z.coerce.date(),
  sentTo: z.string(),
  userId: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
