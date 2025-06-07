import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { db } from '@/lib/db';
import { getUserByEmail } from './actions/get-user';

export default {
  providers: [
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
