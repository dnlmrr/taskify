import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/actions/get-user';

export const POST = async (req: Request) => {
  const { name, email } = await req.json();

  if (!name || !email) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return new NextResponse('Email exists', { status: 400 });
  }

  const user = await db.user.create({
    data: {
      name,
      email,
    },
  });

  return NextResponse.json(user);
};
