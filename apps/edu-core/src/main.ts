import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from '@x-mgmt/prisma-client';

const logger = createLogger('EduCore');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('epi');
  const port = process.env.EDUCORE_PORT || 3001;
  await app.listen(port);
  logger.info(`EduCore running on port ${port}`);
}
bootstrap();
