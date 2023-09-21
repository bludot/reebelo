import * as fs from 'fs';
import { Module } from '@nestjs/common';

import { ConnectionOptions, DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { MysqlConnector2Config } from './mysql-connector2.config';

const useCert: boolean = fs.existsSync(`${process.cwd()}/secrets/cert`);
// eslint-disable-next-line @typescript-eslint/ban-types
const ssl: object = {
  ssl: true,
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ...(useCert
        ? {
            ca: fs.readFileSync(`${process.cwd()}/secrets/cert`).toString(),
          }
        : {}),
    },
  },
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // connectionName: dataSourceConnectionName,
      // name: dataSourceConnectionName,
      imports: [ConfigModule.register(MysqlConnector2Config)],
      useFactory: (
        config: ConfigService<MysqlConnector2Config>,
      ): DataSourceOptions => {
        const options: DataSourceOptions = {
          type: 'mysql',
          host: config.env.DBHOST,
          port: config.env.DBPORT,
          username: config.env.DBUSERNAME,
          password: config.env.DBPASSWORD,
          database: config.env.DBDATABASE,
          ...(process.env.ENV !== 'local' && process.env.ENV !== 'dev'
            ? ssl
            : {}),
          synchronize: false,
          ...(process.env.ENV !== 'local'
            ? { entities: ['modules/**/*.entity.{ts,js}'] }
            : { entities: ['dist/src/modules/**/*.entity.js'] }),
          migrations: ['migration/*.js'],
          // cli: {
          //   migrationsDir: 'migration',
          // },
        };

        return options;
      },
      inject: [ConfigService],
    }),
  ],
})
export class TypeormConnector2Module {}
