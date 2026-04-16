import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isDbDirty } from '@/lib/db/isDirty';

export async function GET() {
  try {
    const dirty = await isDbDirty(prisma);

    return NextResponse.json({
      dirty,
      message: dirty ? 'Database contains data' : 'Database is empty',
    });
  } catch (error) {
    console.error('Error checking database status:', error);
    return NextResponse.json(
      { error: 'Failed to check database status' },
      { status: 500 },
    );
  }
}
