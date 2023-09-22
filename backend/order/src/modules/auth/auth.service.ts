import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { AuthConfig } from './auth.config';
import { add } from 'date-fns';

export type JWTPayload = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService<AuthConfig>,
    private jwtService: JwtService,
  ) {}

  async refreshToken(uid: string): Promise<{
    token: string;
    exp: Date;
  }> {
    const payload: Partial<JWTPayload> = {
      sub: uid,
    };

    const exp = add(new Date().getTime(), {
      seconds: parseInt(this.config.env.JWT_EXPIRES_IN.slice(0, -1), 10),
    });
    return {
      token: this.jwtService.sign(payload),
      exp: exp,
    };
  }
}
