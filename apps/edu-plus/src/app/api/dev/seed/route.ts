import { NextResponse, NextRequest } from 'next/server';
import { seedMain as main } from '@x-mgmt/prisma-client';
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
    logger.error({ err: error }, 'Seeding API route failed');
    return NextResponse.json(
      { success: false, message: 'Seeding failed' },
      { status: 500 },
    );
  }
}
