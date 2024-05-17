import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: true,
  };
  app.enableCors(corsOptions);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const logger = new Logger();

  await app.listen(process.env.PORT || 4000);

  logger.log(`se esta ejecutando en el puerto ${await app.getUrl()}`);
}
bootstrap();
