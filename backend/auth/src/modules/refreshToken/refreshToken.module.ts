import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { alignColorsAndTime } from '../common/logger/loggerFormat';
import { RefreshTokenEntity } from './repositories/refreshToken.entity';
import { RefreshTokenService } from './refreshToken.service';
import { DataSource } from 'typeorm';
import { customRefreshTokenRepositoryMethods } from './repositories/refreshToken.repository';
import { ConfigModule } from '../config/config.module';
import { RefreshTokenConfig } from './refreshToken.config';

@Module({
  imports: [
    ConfigModule.register(RefreshTokenConfig),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    WinstonModule.forRoot({
      // options
      transports: [
        new transports.File({
          filename: 'error.log',
          level: 'error',
        }),
        new transports.Console({
          level: 'warn',
          format: format.combine(
            alignColorsAndTime(RefreshTokenModule.name, 'yellow'),
          ),
        }),
        new transports.Console({
          level: 'info',
          format: format.combine(
            alignColorsAndTime(RefreshTokenModule.name, 'blue'),
          ),
        }),
        new transports.Console({
          level: 'error',
          format: format.combine(
            alignColorsAndTime(RefreshTokenModule.name, 'red'),
          ),
        }),
        new transports.Console({
          level: 'debug',
          format: format.combine(
            alignColorsAndTime(RefreshTokenModule.name, 'magenta'),
          ),
        }),
      ],
    }),
  ],
  providers: [
    RefreshTokenService,
    {
      provide: getRepositoryToken(RefreshTokenEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(RefreshTokenEntity)
          .extend(customRefreshTokenRepositoryMethods);
      },
    },
  ],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
