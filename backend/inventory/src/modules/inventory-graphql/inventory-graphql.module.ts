import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { alignColorsAndTime } from '../common/logger/loggerFormat';
import { InventoryResolvers } from './inventory.resolvers';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { AuthConfig } from '../auth/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import {InventoryModule} from "../inventory/inventory.module";

@Module({
  imports: [
    InventoryModule,
    ConfigModule.register(AuthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.register(AuthConfig)],
      useFactory: async (config: ConfigService<AuthConfig>) => ({
        global: true,
        secret: config.env.JWT_SECRET,
        signOptions: {
          expiresIn: config.env.JWT_EXPIRES_IN,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,

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
      }))(InventoryGraphqlModule.name),
    ),
  ],
  providers: [InventoryResolvers],
})
export class InventoryGraphqlModule {}
