import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { alignColorsAndTime } from '../common/logger/loggerFormat';
import { InventoryEntity } from './repository/inventory.entity';
import { DataSource } from 'typeorm';
import { customTicketRepositoryMethods } from './repository/inventory.repository';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity]),
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
      }))(InventoryModule.name),
    ),
  ],
  providers: [
    {
      provide: getRepositoryToken(InventoryEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(InventoryEntity)
          .extend(customTicketRepositoryMethods);
      },
    },
    InventoryService,
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
