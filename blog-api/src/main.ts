import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS in development so the frontend (running on a different origin)
  // can make requests to the API. In production, tighten this to trusted origins.
  app.enableCors({ origin: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = app.get(ConfigService);
  const port = config.get<number>('port') ?? 5000;
  await app.listen(port);
}

bootstrap().catch((e) => {
  console.log(e);
});
