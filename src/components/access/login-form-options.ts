import { formOptions } from '@tanstack/react-form-nextjs';
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const formOpts = formOptions({
  defaultValues: {
    email: '',
    password: '',
  },
  validators: {
    onChange: loginSchema,
  },
});
