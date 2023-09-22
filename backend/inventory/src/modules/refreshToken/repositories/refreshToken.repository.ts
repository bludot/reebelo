import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './refreshToken.entity';

export interface RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  this: Repository<RefreshTokenEntity>;

  createToken(token: Partial<RefreshTokenEntity>): Promise<RefreshTokenEntity>;

  findByToken(token: string): Promise<RefreshTokenEntity>;
}

export const customRefreshTokenRepositoryMethods: Pick<
  RefreshTokenRepository,
  'createToken' | 'findByToken'
> = {
  async createToken(
    token: Partial<RefreshTokenEntity>,
  ): Promise<RefreshTokenEntity> {
    const newToken: RefreshTokenEntity = this.create(token);
    return await this.save(newToken);
  },

  async findByToken(token: string): Promise<RefreshTokenEntity> {
    return await this.findOne({ where: { token } });
  },
};
