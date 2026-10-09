import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://sonia-furniture-frontend-k9ue.vercel.app/',
    ],
    credentials: true,
  });

  const port = Number(process.env.PORT) || 5000;

  await app.listen(port, '0.0.0.0');
  console.log(`Server listening on port ${port}`);
}

bootstrap();