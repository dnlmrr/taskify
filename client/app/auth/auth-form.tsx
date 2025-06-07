'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginFormValues, loginFormSchema } from '@/lib/validations/auth-schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthError } from './auth-error';
import SocialsActions from './socials-actions';
import { registerUser } from './register-user';

interface AuthFormProps {
  variant: 'register' | 'login';
}

type AuthSchemaType = LoginFormValues;

function AuthForm({ variant }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  let errorMessage = '';

  if (urlError === 'OAuthAccountNotLinked') {
    errorMessage = 'Email already in use with a different provider!';
  } else if (urlError === 'CredentialsSignin') {
    errorMessage = 'Wrong credentials.';
  } else if (urlError === 'OAuthCallbackError') {
    errorMessage = 'An unexpected error occurred.';
  }
  const form = useForm<AuthSchemaType>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit: SubmitHandler<AuthSchemaType> = async (
    data: AuthSchemaType,
  ) => {
    try {
      setIsLoading(true);

      const { email, name } = data as LoginFormValues;

      if (variant === 'login') {
        await signIn('credentials', {
          email,
          name,
          callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
      } else if (variant === 'register') {
        await registerUser({ email, name });
        toast.success('Successfully registered. You can now log in.');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Oops. Something went wrong.');
      }
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 max-w-sm w-full mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AuthError message={errorMessage} />
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
          variant="default"
          onClick={form.handleSubmit(onSubmit)}
        >
          {variant === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
      {variant === 'login' && <SocialsActions />}
    </Form>
  );
}
export default AuthForm;
