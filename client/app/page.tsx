import * as React from 'react';
import { Metadata } from 'next';
import AuthForm from './auth/auth-form';
import { Icons } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function HomePage() {
  return (
    <div
      style={{
        background:
          'linear-gradient(to bottom, hsl(var(--background)) 10%, transparent 80%)',
      }}
    >
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.Logo className="mx-auto h-6 w-6" />
            <h1 className="text-xl font-semibold tracking-tight">Login to Taskify</h1>
            <p className="text-sm text-muted-foreground">
              Ready to tackle your tasks? Just sign in below.
            </p>
          </div>
          <AuthForm variant="login" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a href="/auth/register" className="hover:text-brand underline underline-offset-4">
              Don&apos;t have an account? Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
