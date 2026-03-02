'use server';
import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form-nextjs';

import { verifyPassword } from '@/lib/crypto';
import { prisma } from '@/lib/prisma';
import { formOpts, loginSchema } from '@/components/access/login-form-options';
import logger from '@/lib/logger';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: loginSchema,
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
      // need to throw a similar error so we can show in ui
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
      // need to throw a similar error so we can show in ui
      return;
    }

    // success logic here
  } catch (error) {
    console.error('Error in loginAction:', JSON.stringify(error));
    if (error instanceof ServerValidateError) {
      return error.formState;
    }

    logger.error({ error }, 'Unhandled error in loginAction');
    throw error;
  }
}
