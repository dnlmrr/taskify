import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import { db } from '@/lib/db';
import { getUserByEmail } from './actions/get-user';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, name } = credentials;

        if (!email || !name) return null;

        let user = await getUserByEmail(email as string);

        if (!user) {
          user = await db.user.create({ data: { email, name } });
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
