import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { prisma, type DbClient } from '@x-mgmt/prisma-client';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly client: DbClient = prisma;

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
