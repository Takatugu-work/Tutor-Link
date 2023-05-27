import { Ctx } from 'blitz';

export default async function logout(_: any, ctx: Ctx) {
  ctx.session.$authorize();
  return await ctx.session.$revoke();
}
