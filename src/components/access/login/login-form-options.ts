import { formOptions } from '@tanstack/react-form-nextjs';
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export interface LoginType {
  email: string;
  password: string;
}

const defaultValues: LoginType = {
  email: '',
  password: '',
};

export const formOpts = formOptions({
  defaultValues: defaultValues,
  validators: {
    onChange: loginSchema,
  },
});
