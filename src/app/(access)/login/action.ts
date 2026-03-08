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
  LoginFormData,
} from '@/components/access/login/login-form-options';
import logger from '@/lib/logger';
import type { UserModel } from '@/generated/prisma/models/User';

// Type definitions
type ValidationError = {
  message: string;
};

type AuthenticatedUser = Pick<UserModel, 'id' | 'email'>;

type ValidationResult =
  | {
      isError: false;
      data: LoginFormData;
      user: AuthenticatedUser;
    }
  | {
      isError: true;
      data: {
        form: string;
        fields: {
          email?: ValidationError[];
          password?: ValidationError[];
        };
      };
      user: null;
    };

// Constants
const AUTH_ERROR_MESSAGE = 'Incorrect email or password';
const INVALID_DATA_MESSAGE = 'Invalid data';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: loginSchema,
});

/**
 * Creates a standardized authentication error response
 * @param overrideMessage - Optional custom error message to override the default authentication error message
 * @returns Formatted authentication error object
 */
function createAuthError(overrideMessage?: string): ValidationResult {
  return {
    isError: true,
    data: {
      form: INVALID_DATA_MESSAGE,
      fields: {
        // email: [{ message: AUTH_ERROR_MESSAGE }],
        password: [{ message: overrideMessage || AUTH_ERROR_MESSAGE }],
      },
    },
    user: null,
  };
}

/**
 * Validates user login credentials against the database
 * @param processedData - The validated login form data containing email and password
 * @param isClient - Flag indicating if the validation request origin is being performed on the client side (default: false)
 * @returns ValidationResult containing either user data on success or error messages on failure
 */
export async function validateLoginForm(
  processedData: LoginFormData,
  isClient = false,
): Promise<ValidationResult> {
  // Attempt to find user by email
  try {
    const user = await prisma.user.findUnique({
      where: { email: processedData.email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      !isClient &&
        logger.warn(
          'Login attempt with non-existent email: %s',
          processedData.email,
        );
      return createAuthError();
    }

    // Verify password hash
    const isPasswordValid = await verifyPassword(
      user.passwordHash,
      processedData.password,
    );

    if (!isPasswordValid) {
      !isClient &&
        logger.warn(
          'Invalid password attempt for email: %s',
          processedData.email,
        );
      return createAuthError();
    }

    // Omit passwordHash from the returned user object
    const { passwordHash, ...userWithoutPassword } = user;

    logger.info('User authenticated successfully: %s', user.email);
    return {
      isError: false,
      data: processedData,
      user: userWithoutPassword,
    };
  } catch (error) {
    logger.error(
      { error },
      'Error during login validation for email: %s',
      processedData.email,
    );
    return createAuthError(
      'An unexpected error occurred. Please try again later.',
    );
  }
}

export async function loginAction(prev: unknown, formData: FormData) {
  try {
    const validatedData = await serverValidate(formData);

    const { user } = await validateLoginForm(validatedData);
    if (!user) {
      return;
      // redirect('/login?error=login_failed');
    }
    logger.info('User logged in successfully: %s', user.email);
    await createSession(user.id!.toString());
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return error.formState;
    }
    logger.error({ error }, 'Unhandled error in loginAction');
    throw error;
  }
}
