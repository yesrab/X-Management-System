import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/sessions';
import logger from '@/lib/logger';

/**
 * POST /api/access/logout
 * Logs out the user by deleting their session cookie
 */
export async function POST(request: NextRequest) {
  try {
    await deleteSession();

    logger.info('User logged out successfully');

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 },
    );
  } catch (error) {
    logger.error({ error }, 'Error during logout');

    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 },
    );
  }
}

/**
 * GET /api/access/logout
 * Alternative logout endpoint for GET requests
 */
export async function GET(request: NextRequest) {
  try {
    await deleteSession();

    logger.info('User logged out successfully via GET');

    // Redirect to login page after logout
    return NextResponse.redirect(new URL('/login', request.url));
  } catch (error) {
    logger.error({ error }, 'Error during logout');

    return NextResponse.redirect(
      new URL('/login?error=logout_failed', request.url),
    );
  }
}
