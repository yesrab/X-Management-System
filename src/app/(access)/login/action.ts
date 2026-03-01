'use server';

import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form-nextjs';
import { formOpts, loginSchema } from '@/components/access/login-form-options';
import { z } from 'zod';

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: loginSchema,
});

export default async function someAction(prev: unknown, formData: FormData) {
  try {
    const validatedData = await serverValidate(formData);
    console.log('validatedData', validatedData);
    // Persist the form data to the database
    // await sql`
    //   INSERT INTO users (name, email, password)
    //   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
    // `
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   console.log('validation errors:', error.issues);
    //   return error.formErrors.fieldErrors as never;
    // }
    // return error.formstate as never;
    if (error instanceof ServerValidateError) {
      console.log('validation errors:', error);
      console.log('validation errors form state:', error.formState);
      return error.formState as never;
    }
    // Some other error occurred while validating your form
    throw error;
  }

  // Your form has successfully validated!
}
