import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z
    .string()
    .min(2, 'Name should be at least 2 characters long')
    .max(15, 'Name is too long (maximum 15 characters)'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema = loginFormSchema;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
