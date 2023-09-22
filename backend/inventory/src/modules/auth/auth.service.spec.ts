import { AuthService } from './auth.service';
import { RefreshTokenService } from '../refreshToken/refreshToken.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { MysqlConnector2Config } from '../mysql-connector2/mysql-connector2.config';
import { ConfigService } from '../config/config.service';
import { Connection, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/repository/user.entity';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard';
import { AuthGraphqlGuard } from './auth.graphql.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfig } from './auth.config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from '../refreshToken/refreshToken.module';
import { ulid } from 'ulid';

describe('AuthService', () => {
  let authService: AuthService;
  let refreshTokenService: RefreshTokenService;
  let userService: UserService;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.register(AuthConfig, {
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
        TypeOrmModule.forFeature([UserEntity]),
        WinstonModule.forRoot({
          transports: [
            new transports.Console({
              level: 'info',
            }),
          ],
        }),
        JwtModule.registerAsync({
          imports: [
            ConfigModule.register(AuthConfig, {
              envFile: '.env.test',
            }),
          ],
          useFactory: async (config: ConfigService<AuthConfig>) => ({
            global: true,
            secret: config.env.JWT_SECRET,
            signOptions: { expiresIn: config.env.JWT_EXPIRES_IN },
          }),
          inject: [ConfigService],
        }),
        UserModule,
        RefreshTokenModule,
      ],
      providers: [AuthService, AuthGuard, AuthGraphqlGuard],
    }).compile();

    authService = moduleFixture.get<AuthService>(AuthService);
    refreshTokenService =
      moduleFixture.get<RefreshTokenService>(RefreshTokenService);
    userService = moduleFixture.get<UserService>(UserService);
    connection = moduleFixture.get<Connection>(Connection);
  });

  afterEach(async () => {
    if (connection?.isConnected) {
      await connection.close();
    }
  });

  describe('signIn', () => {
    it('should return a token', async () => {
      const username = ulid();

      await authService.register(username, 'test');

      const user = await userService.getUserByUsername(username);
      const result = await authService.signIn(user.username, 'test');
      expect(result.token).toBeDefined();
      expect(result.exp).toBeDefined();
      expect(result.uid).toBeDefined();
    });

    it('should throw an error if the user does not exist', async () => {
      const username = ulid();
      await expect(
        authService.signIn(username, 'test'),
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should throw an error if the password is invalid', async () => {
      const username = ulid();
      await authService.register(username, 'test');
      await expect(
        authService.signIn(username, 'test2'),
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe('register', () => {
    it('should return true', async () => {
      const username = ulid();
      const result = await authService.register(username, 'test');
      expect(result).toBeTruthy();
    });

    it('should throw an error if the user already exists', async () => {
      const username = ulid();
      await authService.register(username, 'test');
      await expect(
        authService.register(username, 'test'),
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe('refreshToken', () => {
    it('should return a token', async () => {
      const username = ulid();

      await authService.register(username, 'test');
      const user = await authService.signIn(username, 'test');
      const result = await authService.refreshToken(user.uid);
      expect(result.token).toBeDefined();
      expect(result.exp).toBeDefined();
    });
  });
});
