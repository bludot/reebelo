import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './repository/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(
    username: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    this.logger.info('Creating user');
    const user: UserEntity = await this.userRepository.createUser(
      username,
      password,
    );
    return {
      id: user.id,
      username: user.username,
      uid: user.uid,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    this.logger.info('Getting user by username');
    const user: UserEntity = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getUserByUID(uid: string): Promise<UserEntity> {
    this.logger.info('Getting user by uid');

    const user: UserEntity = await this.userRepository.findByUID(uid);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
