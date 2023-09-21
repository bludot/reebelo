import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
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
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{
    token: string;
    exp: Date;
    uid: string;
  }> {
    const user = await this.userService
      .getUserByUsername(username)
      .catch(() => {
        return null;
      });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload: Partial<JWTPayload> = {
      sub: user.uid,
      username: user.username,
    };

    const exp = add(new Date().getTime(), {
      seconds: parseInt(this.config.env.JWT_EXPIRES_IN.slice(0, -1), 10),
    });

    return {
      uid: user.uid,
      token: this.jwtService.sign(payload),
      exp: exp,
    };
  }

  async register(username: string, password: string): Promise<boolean> {
    const user = await this.userService
      .getUserByUsername(username)
      .catch(() => {
        return null;
      });
    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await argon2.hash(password);
    await this.userService.createUser(username, hashedPassword);
    return true;
  }

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
