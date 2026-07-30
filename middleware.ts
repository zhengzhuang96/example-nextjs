/*
 * @Author: {zhengzhuang}
 * @Date: 2026-07-30 11:09:33
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2026-07-30 11:13:17
 * @Description:
 */
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.net.cn/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs',
};