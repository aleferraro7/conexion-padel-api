import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  ValidationPipe,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const logger = new ConsoleLogger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
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
  // console.log('http://localhost:3000/docs/');
  logger.log('http://localhost:3000/docs/');
}
bootstrap();
