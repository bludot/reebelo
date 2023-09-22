import { Expose } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class RefreshTokenConfig {
  @Expose()
  @IsNumberString()
  public readonly TOKEN_EXPIRATION_DAYS: number;
}
