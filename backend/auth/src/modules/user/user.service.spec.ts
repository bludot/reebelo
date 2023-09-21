import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { customUserRepositoryMethods } from './repository/user.repository';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { MysqlConnector2Config } from '../mysql-connector2/mysql-connector2.config';
import { ConfigService } from '../config/config.service';
import { Connection, DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './repository/user.entity';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { ulid } from 'ulid';

describe('UserService', () => {
  let userService: UserService;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
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
      ],
      providers: [
        UserService,
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
      ],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    connection = moduleFixture.get<Connection>(Connection);
  });

  afterEach(async () => {
    if (connection?.isConnected) {
      await connection.close();
    }
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const username = ulid();
      const result = new UserEntity();
      result.username = username;
      result.password = 'password';

      const actual = await userService.createUser(username, 'password');
      expect(actual.username).toEqual(result.username);
      // expect there to be no password
      expect(actual['password']).toBeUndefined();
    });
    it('should throw an error if the user already exists', async () => {
      const username = ulid();
      await userService.createUser(username, 'password');
      await expect(
        userService.createUser(username, 'password'),
      ).rejects.toThrowError();
    });
  });

  describe('findUserByUsername', () => {
    it('should find a user by username', async () => {
      const username = ulid();
      await userService.createUser(username, 'password');
      const actual = await userService.getUserByUsername(username);
      expect(actual.username).toEqual(username);
    });
    it('should throw an error if the user does not exist', async () => {
      const username = ulid();
      await expect(
        userService.getUserByUsername(username),
      ).rejects.toThrowError();
    });
  });
});
