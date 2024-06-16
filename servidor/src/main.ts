import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
