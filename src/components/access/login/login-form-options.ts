import { formOptions } from '@tanstack/react-form-nextjs';
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export interface LoginFormData {
  email: string;
  password: string;
}

const defaultValues: LoginFormData = { email: '', password: '' };
export const formOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: loginSchema,
  },
});
