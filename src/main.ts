import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { pino } from 'pino';

async function bootstrap() {
  const logger = pino({
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
          },
        },
      ],
    },
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Conexion Padel')
    .setDescription('Conexion Padel API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Conexion-Padel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  logger.info('The server is running in: http://localhost:3000/');
  logger.info('Swagger is running in: http://localhost:3000/docs/');
}
bootstrap();
