import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class MysqlConnector2Config {
  @Expose()
  @IsString()
  readonly DBHOST: string;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  readonly DBPORT: number;

  @Expose()
  @IsString()
  readonly DBUSERNAME: string;

  @Expose()
  @IsString()
  readonly DBPASSWORD: string;

  @Expose()
  @IsString()
  readonly DBDATABASE: string;
}

export const dataSourceConnectionName = 'DATA_SOURCE_POSTGRES';
