import { Connection, DataSource, DataSourceOptions } from 'typeorm';
import { RefreshTokenService } from './refreshToken.service';
import { MysqlConnector2Config } from '../mysql-connector2/mysql-connector2.config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { RefreshTokenEntity } from './repositories/refreshToken.entity';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { customRefreshTokenRepositoryMethods } from './repositories/refreshToken.repository';
import { ulid } from 'ulid';
import { RefreshTokenConfig } from './refreshToken.config';

describe('RefreshTokenService', () => {
  let refreshTokenService: RefreshTokenService;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.register(RefreshTokenConfig, {
          envFile: '.env.test',
        }),
        TypeOrmModule.forRootAsync({
          imports: [
            ConfigModule.register(MysqlConnector2Config, {
              envFile: '.env.test',
            }),
          ],
          useFactory: (config: ConfigService<MysqlConnector2Config>) => {
            const options: DataSourceOptions = {
              type: 'mysql',
              host: config.env.DBHOST,
              port: config.env.DBPORT,
              username: config.env.DBUSERNAME,
              password: config.env.DBPASSWORD,
              database: config.env.DBDATABASE,

              synchronize: false,
              entities: ['./../**/*.entity.{ts,js}'],
              migrations: ['../../../migration/*.js'],
            };

            return options;
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([RefreshTokenEntity]),
        WinstonModule.forRoot({
          transports: [
            new transports.Console({
              level: 'info',
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
    }).compile();

    refreshTokenService =
      moduleFixture.get<RefreshTokenService>(RefreshTokenService);
    connection = moduleFixture.get<Connection>(Connection);
  });

  afterEach(async () => {
    if (connection?.isConnected) {
      await connection.close();
    }
  });

  describe('createToken', () => {
    it('should create a new token', async () => {
      const userId = ulid();
      const token = await refreshTokenService.createToken(userId);
      expect(token).toBeDefined();
      expect(token.token).toBeDefined();
      expect(token.userId).toBe(userId);
      expect(token.expiresAt).toBeDefined();
    });

    it('should fail to create a new token if user is missing', async () => {
      const userId = undefined;
      await expect(refreshTokenService.createToken(userId)).rejects.toThrow();
    });
  });

  describe('token validility', () => {
    it('should return true if token is valid', async () => {
      const userId = ulid();
      const token = await refreshTokenService.createToken(userId);
      const isValid = await refreshTokenService.isValid(userId, token.token);
      expect(isValid).toBe(true);
    });

    it('should return false if token is invalid', async () => {
      const userId = ulid();
      await refreshTokenService.createToken(userId);
      const isValid = await refreshTokenService.isValid(userId, 'invalid');
      expect(isValid).toBe(false);
    });

    it('should return false if token user is wrong', async () => {
      const userId = ulid();
      const token = await refreshTokenService.createToken(userId);
      const isValid = await refreshTokenService.isValid('wrong', token.token);
      expect(isValid).toBe(false);
    });

    it('should return false if token is missing', async () => {
      const userId = ulid();
      await refreshTokenService.createToken(userId);
      const isValid = await refreshTokenService.isValid(userId, undefined);
      expect(isValid).toBe(false);
    });
  });
});
