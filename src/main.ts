import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    cookieSession({
      name: 'session',
      keys: ['session_secret_key'],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  );
  await app.listen(3000);
}
bootstrap();
