import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repositories/refreshToken.repository';
import { RefreshTokenEntity } from './repositories/refreshToken.entity';
import { ulid } from 'ulid';
import { ConfigService } from '../config/config.service';
import { Logger } from 'winston';
import { RefreshTokenConfig } from './refreshToken.config';
import { add } from 'date-fns';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly config: ConfigService<RefreshTokenConfig>,
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async createToken(userId: string): Promise<RefreshTokenEntity> {
    const token = ulid();
    const expiresAt = add(new Date(), {
      days: this.config.env.TOKEN_EXPIRATION_DAYS,
    });

    const newToken: RefreshTokenEntity = this.refreshTokenRepository.create({
      token,
      userId,
      expiresAt,
    });
    return await this.refreshTokenRepository.save(newToken);
  }

  async isValid(userid: string, token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByToken(token);
    // make sure token is not expired
    if (
      refreshToken &&
      refreshToken.userId === userid &&
      refreshToken.expiresAt > new Date()
    ) {
      return true;
    }
    return false;
  }
}
