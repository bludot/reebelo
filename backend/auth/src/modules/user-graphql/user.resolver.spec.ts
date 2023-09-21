import { Connection, DataSourceOptions } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config/config.module';
import { AuthConfig } from '../auth/auth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnector2Config } from '../mysql-connector2/mysql-connector2.config';
import { ConfigService } from '../config/config.service';
import { UserEntity } from '../user/repository/user.entity';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from '../common/directives/upper-case.directive';
import * as path from 'path';
import { UserModule } from '../user/user.module';
import { RefreshTokenModule } from '../refreshToken/refreshToken.module';
import { AuthModule } from '../auth/auth.module';
import { TicketResolvers } from '../ticket-graphql/ticket.resolvers';
import { AuthResolvers } from '../auth-graphql/auth.resolvers';
import { INestApplication } from '@nestjs/common';
import { ulid } from 'ulid';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { AccessToken, User } from '../../graphql';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthGraphqlGuard } from '../auth/auth.graphql.guard';
import { UserResolvers } from './user.resolvers';

describe('UserResolver', () => {
  let app: INestApplication;

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
      providers: [
        AuthService,
        AuthGuard,
        AuthGraphqlGuard,
        AuthResolvers,
        UserResolvers,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    connection = moduleFixture.get<Connection>(Connection);
    await app.init();
  });

  afterEach(async () => {
    if (connection?.isConnected) {
      await connection.close();
    }
  });

  describe('get user profile', () => {
    it('should return user profile', async () => {
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

      const { data: me } = await request(app.getHttpServer())
        .set(
          'Authorization',
          `Bearer ${((data as any).signIn as AccessToken).token}`,
        )
        .query(
          gql`
            query profile {
              profile {
                username
                uid
                id
              }
            }
          `,
        )
        .expectNoErrors();

      expect(((me as any).profile as User).username).toEqual(username);
    });
  });
});
