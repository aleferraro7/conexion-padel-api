import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  const config = new DocumentBuilder()
    .setTitle('Conexion Padel')
    .setDescription('Conexion Padel API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Conexion-Padel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000/docs/');
}
bootstrap();
