import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthConfig {
  @Expose()
  @IsString()
  public readonly JWT_SECRET: string;

  @Expose()
  @IsString()
  public readonly JWT_EXPIRES_IN: string;
}
