'use server';
import {
  ServerValidateError,
  createServerValidate,
  type StandardSchemaV1Issue,
} from '@tanstack/react-form-nextjs';
import { redirect } from 'next/navigation';
import type { z } from 'zod';

import { verifyPassword } from '@/lib/crypto';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/sessions';
import {
  formOpts,
  loginSchema,
} from '@/components/access/login/login-form-options';
import logger from '@/lib/logger';
import { fi } from 'zod/v4/locales';

type LoginFormData = z.infer<typeof loginSchema>;

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: loginSchema,
});

const credentialErrors: Record<string, StandardSchemaV1Issue[]> = {
  email: [{ path: ['email'], message: 'Invalid email or password' }],
  password: [{ path: ['password'], message: 'Invalid email or password' }],
};

function throwCredentialError(values: LoginFormData): never {
  throw new ServerValidateError<LoginFormData, typeof loginSchema>({
    formState: {
      errorMap: {
        onServer: credentialErrors,
      },
      values,
      errors: [],
    },
  });
}

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
      // throwCredentialError(validatedData);
      return {
        fields: {
          email: 'Invalid email address',
          password: 'Incorrect password',
        },
      };
    }

    const isValid = await verifyPassword(
      user.passwordHash,
      validatedData.password,
    );

    if (!isValid) {
      logger.warn(
        'Invalid password attempt for email: %s',
        validatedData.email,
      );
      // throwCredentialError(validatedData);
      return {
        fields: {
          email: 'Invalid email address',
          password: 'Incorrect password',
        },
      };
    }

    await createSession(user.id.toString());
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return error.formState;
    }

    logger.error({ error }, 'Unhandled error in loginAction');
    throw error;
  }

  redirect('/dashboard');
}
