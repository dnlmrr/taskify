'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/actions/get-user';

interface UserDetails {
  name: string;
  email: string;
}

export const registerUser = async ({ name, email }: UserDetails) => {
  if (!name || !email) {
    throw new Error('Missing fields.');
  }

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    throw new Error('Email already exists.');
  }

  await db.user.create({
    data: {
      name,
      email,
    },
  });

  return redirect('/login');
};
