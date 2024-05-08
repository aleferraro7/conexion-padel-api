import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PinoLoggerService } from './pino-logger.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  providers: [LoggerService, PinoLoggerService],
  exports: [LoggerService, PinoLoggerService],
  imports: [LoggerModule.forRoot()],
})
export class PinoLoggerModule {}
