import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { alignColorsAndTime } from '../common/logger/loggerFormat';
import { UserService } from './user.service';

import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';

import { UserEntity } from './repository/user.entity';
import { DataSource } from 'typeorm';
import { customUserRepositoryMethods } from './repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    WinstonModule.forRoot(
      ((name: string) => ({
        // options
        transports: [
          new transports.File({
            filename: 'error.log',
            level: 'error',
          }),
          new transports.Console({
            level: 'warn',
            format: format.combine(alignColorsAndTime(name, 'yellow')),
          }),
          new transports.Console({
            level: 'info',
            format: format.combine(alignColorsAndTime(name, 'blue')),
          }),
          new transports.Console({
            level: 'error',
            format: format.combine(alignColorsAndTime(name, 'red')),
          }),
          new transports.Console({
            level: 'debug',
            format: format.combine(alignColorsAndTime(name, 'magenta')),
          }),
        ],
      }))(UserModule.name),
    ),
  ],
  providers: [
    {
      provide: getRepositoryToken(UserEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(UserEntity)
          .extend(customUserRepositoryMethods);
      },
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
