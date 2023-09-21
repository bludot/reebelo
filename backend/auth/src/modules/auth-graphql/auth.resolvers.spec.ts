import { RefreshTokenService } from '../refreshToken/refreshToken.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthResolvers } from './auth.resolvers';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config/config.module';
import { AuthConfig } from '../auth/auth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnector2Config } from '../mysql-connector2/mysql-connector2.config';
import { ConfigService } from '../config/config.service';
import { Connection, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/repository/user.entity';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { RefreshTokenModule } from '../refreshToken/refreshToken.module';
import { AuthGuard } from '../auth/auth.guard';
import { AuthGraphqlGuard } from '../auth/auth.graphql.guard';
import { ulid } from 'ulid';
import { INestApplication } from '@nestjs/common';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { AuthModule } from '../auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from '../common/directives/upper-case.directive';
import * as path from 'path';
import { AccessToken } from '../../graphql';

describe('AuthResolver', () => {
  let authResolver: AuthResolvers;
  let authService: AuthService;
  let userService: UserService;
  let refreshTokenService: RefreshTokenService;
  let connection: Connection;

  let app: INestApplication;

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
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          playground: true,
          typePaths: ['./**/*.graphql'],
          transformSchema: (schema) =>
            upperDirectiveTransformer(schema, 'upper'),
          // autoSchemaFile: path.join(process.cwd(), 'src/schema.graphql'),
          definitions: {
            path: path.join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'class',
          },
        }),
        UserModule,
        RefreshTokenModule,
        AuthModule,
      ],
      providers: [AuthService, AuthGuard, AuthGraphqlGuard, AuthResolvers],
    }).compile();

    app = moduleFixture.createNestApplication();
    authResolver = moduleFixture.get<AuthResolvers>(AuthResolvers);
    authService = moduleFixture.get<AuthService>(AuthService);
    userService = moduleFixture.get<UserService>(UserService);
    refreshTokenService =
      moduleFixture.get<RefreshTokenService>(RefreshTokenService);
    connection = moduleFixture.get<Connection>(Connection);
    await app.init();
  });

  afterEach(async () => {
    if (connection?.isConnected) {
      await connection.close();
    }
  });

  describe('register', () => {
    it('should be able to register', async () => {
      const username = ulid();

      const { data } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      expect((data as any).register).toBe(true);
    });

    it('should fail to register with duplicate username', async () => {
      const username = ulid();

      const { data } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      expect((data as any).register).toBe(true);

      const { errors } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username });

      expect(errors[0].message).toBe('User already exists');
    });
  });

  describe('signIn', () => {
    it('should be able to sign in', async () => {
      const username = ulid();

      await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { data } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation signIn($username: String!) {
              signIn(input: { username: $username, password: "123456" }) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      expect(((data as any).signIn as AccessToken).token).toBeDefined();
      expect(((data as any).signIn as AccessToken).refreshToken).toBeDefined();
      expect(((data as any).signIn as AccessToken).exp).toBeDefined();
    });

    it('should fail to sign in with wrong password', async () => {
      const username = ulid();

      await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { errors } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation signIn($username: String!) {
              signIn(input: { username: $username, password: "1234567" }) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({ username });

      expect(errors[0].message).toBe('Unauthorized');
    });
  });

  describe('refreshToken', () => {
    it('should be able to refresh token', async () => {
      const username = ulid();

      await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { data } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation signIn($username: String!) {
              signIn(input: { username: $username, password: "123456" }) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { data: data2 } = await request(app.getHttpServer())
        .set(
          'Authorization',
          `Bearer ${((data as any).signIn as AccessToken).token}`,
        )
        .mutate(
          gql`
            mutation refreshToken($refreshToken: String!) {
              refreshToken(token: $refreshToken) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({
          refreshToken: ((data as any).signIn as AccessToken).refreshToken,
        })
        .expectNoErrors();

      expect(((data2 as any).refreshToken as AccessToken).token).toBeDefined();
      expect(
        ((data2 as any).refreshToken as AccessToken).refreshToken,
      ).toBeDefined();
      expect(((data2 as any).refreshToken as AccessToken).exp).toBeDefined();
    });

    it('should fail to refresh token with wrong refresh token', async () => {
      const username = ulid();

      await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { data } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation signIn($username: String!) {
              signIn(input: { username: $username, password: "123456" }) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { errors } = await request(app.getHttpServer())
        .set(
          'Authorization',
          `Bearer ${((data as any).signIn as AccessToken).token}`,
        )
        .mutate(
          gql`
            mutation refreshToken($refreshToken: String!) {
              refreshToken(token: $refreshToken) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({
          refreshToken: 'invalid',
        });

      expect(errors[0].message).toBe('Invalid refresh token');
    });

    it('should fail to refresh token with expired JWT', async () => {
      const username = ulid();

      await request(app.getHttpServer())
        .mutate(
          gql`
            mutation register($username: String!) {
              register(input: { username: $username, password: "123456" })
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { data } = await request(app.getHttpServer())
        .mutate(
          gql`
            mutation signIn($username: String!) {
              signIn(input: { username: $username, password: "123456" }) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({ username })
        .expectNoErrors();

      const { errors } = await request(app.getHttpServer())
        .set('Authorization', `Bearer invalid`)
        .mutate(
          gql`
            mutation refreshToken($refreshToken: String!) {
              refreshToken(token: $refreshToken) {
                token
                refreshToken
                exp
              }
            }
          `,
        )
        .variables({
          refreshToken: ((data as any).signIn as AccessToken).refreshToken,
        });

      expect(errors[0].message).toBe('Unauthorized');
    });
  });
});
