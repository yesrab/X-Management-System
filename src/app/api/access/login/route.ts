import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/crypto';
import { encrypt } from '@/lib/sessions';
import { cookies } from 'next/headers';
import { loginSchema } from '@/components/access/login/login-form-options';
import { redirect, RedirectType } from 'next/navigation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input using Zod schema
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues
        .map((err) => err.message)
        .join(', ');

      return NextResponse.json(
        {
          status: 400,
          message: errorMessages,
          data: validationResult,
        },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;

    // Find user by userId (email)
    const user = await prisma.user.findUnique({
      where: {
        userId: email,
      },
    });

    // Handle user not found
    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          message: 'User not found',
          data: null,
        },
        { status: 404 },
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(user.passwordHash, password);

    // Handle invalid password
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: 401,
          message: 'Invalid password',
          data: null,
        },
        { status: 401 },
      );
    }

    // Generate token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const token = await encrypt({ userId: user.userId, expiresAt });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    // Return success response
    // return NextResponse.json(
    //   {
    //     status: 200,
    //     message: 'Login success',
    //     data: {
    //       token,
    //       userid: user.userId,
    //     },
    //   },
    //   { status: 200 },
    // );

    return redirect('/dashboard', RedirectType.replace); // Redirect to dashboard on successful login
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal server error',
        data: null,
      },
      { status: 500 },
    );
  }
}
