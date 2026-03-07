import { NextResponse, NextRequest } from 'next/server';
import { main } from '@/prisma/seed';
import logger from '@/lib/logger';

const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET;
const canUsedSecret = sessionSecret && sessionSecret !== 'danger';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { secret } = body;

  if (isProduction) {
    if (canUsedSecret || secret === sessionSecret) {
      logger.info('Authorized seeding request received in production');
    } else {
      return NextResponse.json(
        { error: 'Not allowed in production' },
        { status: 403 },
      );
    }
  }
  try {
    await main();
    return NextResponse.json({
      success: true,
      message: 'Database reset and seeded successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Seeding failed' },
      { status: 500 },
    );
  }
}
