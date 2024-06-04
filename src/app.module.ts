import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from './config/index';
import { DatabaseModule } from './database.module';
import { JwtModule } from '@nestjs/jwt';
import { CourtsModule } from './courts/courts.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptions-logger.filter';
import { PlayersModule } from './players/players.module';
import { LoggerModule } from 'nestjs-pino';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './correlation-id/correlation-id.middleware';
import { Request } from 'express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                messageKey: 'message',
              },
            },
            // NEXT UPDATE WITH PINO-SENTRY
          ],
        },
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          };
        },
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        },
      },
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    UsersModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    CourtsModule,
    PlayersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
