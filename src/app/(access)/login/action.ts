'use server';
import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form-nextjs';

import { verifyPassword } from '@/lib/crypto';
import { prisma } from '@/lib/prisma';
import { formOpts, loginSchema } from '@/components/access/login-form-options';
import logger from '@/lib/logger';
import { z } from 'zod';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    try {
      const result = loginSchema.parse(value);
      console.log('validating on server with value:', value);
      console.log(
        'validation result in onServerValidate:',
        JSON.stringify(result),
      );
    } catch (e) {
      if (e instanceof z.ZodError) {
        const parsedErrors = JSON.parse(e.message);
        logger.warn('Zod validation error in onServerValidate');
        throw new ServerValidateError(parsedErrors);
      }
    }
    return {};
  },
});

export async function loginAction(prev: unknown, formData: FormData) {
  try {
    const validatedData = await serverValidate(formData);

    const user = await prisma.user.findUnique({
      where: { userId: validatedData.email },
    });

    if (!user) {
      logger.warn(
        'Login attempt with non-existent email: %s',
        validatedData.email,
      );
      //need to indicate in UI that they need to sign up or check their email, but not that the email doesn't exist for security reasons
      return;
    }
    const isValid = await verifyPassword(
      validatedData.password,
      user.passwordHash,
    );

    if (!isValid) {
      logger.warn(
        'Invalid password attempt for email: %s',
        validatedData.email,
      );
      //need to indicate in UI that something is wrong, but not what exactly for security reasons
      return;
    }

    // success logic here
  } catch (error) {
    if (error instanceof ServerValidateError) {
      logger.warn('Validation error in loginAction');
      console.log('the error in action:', error.formState);
      return error.formState;
    }

    console.error('Error in loginAction:', JSON.stringify(error));
    logger.error({ error }, 'Unhandled error in loginAction');
    throw error;
  }
}
