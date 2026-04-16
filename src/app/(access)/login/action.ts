'use server';
import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form-nextjs';
import { redirect } from 'next/navigation';

import { verifyPassword } from '@/lib/crypto';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/sessions';
import {
  formOpts,
  loginSchema,
} from '@/components/access/login/login-form-options';
import logger from '@/lib/logger';

// Constants
const AUTH_ERROR_MESSAGE = 'Incorrect email or password';
const INVALID_DATA_MESSAGE = 'Invalid data';

function createAuthError(overrideMessage?: string) {
  return {
    form: INVALID_DATA_MESSAGE,
    fields: {
      password: [{ message: overrideMessage || AUTH_ERROR_MESSAGE }],
    },
  };
}

export async function loginAction(prev: unknown, formData: FormData) {
  let authenticatedUserId: string | null = null;

  const serverValidate = createServerValidate({
    ...formOpts,
    onServerValidate: async ({ value }) => {
      // Server-side input validation (Zod) — don't trust client
      const parsed = loginSchema.safeParse(value);
      if (!parsed.success) {
        return createAuthError();
      }

      const { email, password } = parsed.data;

      // Logical validation — DB lookup + password verification
      try {
        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, passwordHash: true },
        });

        if (!user) {
          logger.warn('Login attempt with non-existent email: %s', email);
          return createAuthError();
        }

        const isPasswordValid = await verifyPassword(
          user.passwordHash,
          password,
        );
        if (!isPasswordValid) {
          logger.warn('Invalid password attempt for email: %s', email);
          return createAuthError();
        }

        logger.info('User authenticated successfully: %s', email);
        authenticatedUserId = user.id.toString();
        return null;
      } catch (error) {
        logger.error(
          { error },
          'Error during login validation for email: %s',
          email,
        );
        return createAuthError(
          'An unexpected error occurred. Please try again later.',
        );
      }
    },
  });

  try {
    await serverValidate(formData);
    if (!authenticatedUserId) return;
    await createSession(authenticatedUserId);
    return redirect('/dashboard');
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return error.formState;
    }
    logger.error({ error }, 'Unhandled error in loginAction');
    throw error;
  }
}
