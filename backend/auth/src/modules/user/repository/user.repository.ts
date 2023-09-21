import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';

export interface UserRepository extends Repository<UserEntity> {
  this: Repository<UserEntity>;

  createUser(username: string, password: string): Promise<UserEntity>;

  findByUsername(username: string): Promise<UserEntity>;

  findByUID(uid: string): Promise<UserEntity>;

  findByID(id: number): Promise<UserEntity>;
}

export const customUserRepositoryMethods: Pick<
  UserRepository,
  'createUser' | 'findByUsername' | 'findByID' | 'findByUID'
> = {
  async createUser(username: string, password: string): Promise<UserEntity> {
    const user = new UserEntity();
    user.uid = ulid();
    user.username = username;
    user.password = password;
    return await this.save(user);
  },

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.findOne({ where: { username } });
  },

  async findByUID(uid: string): Promise<UserEntity> {
    return await this.findOne({ where: { uid } });
  },

  async findByID(id: number): Promise<UserEntity> {
    return await this.findOne({ where: { id } });
  },
};
