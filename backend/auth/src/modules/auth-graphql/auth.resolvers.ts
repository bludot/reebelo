import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService, JWTPayload } from '../auth/auth.service';

import { RefreshTokenService } from '../refreshToken/refreshToken.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphqlGuard } from '../auth/auth.graphql.guard';
import { CurrentUser } from '../common/decorators/user';
import { AccessToken, RegisterInput, SignInInput } from '../../graphql';

@Resolver()
export class AuthResolvers {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Mutation('register')
  async register(@Args('input') args: RegisterInput): Promise<boolean> {
    return this.authService.register(args.username, args.password);
  }

  @Mutation('signIn')
  async signIn(
    @Args('input') { username, password }: SignInInput,
  ): Promise<AccessToken> {
    const jwt = await this.authService.signIn(username, password);
    const refreshToken = await this.refreshTokenService.createToken(jwt.uid);

    return {
      token: jwt.token,
      exp: jwt.exp,
      refreshToken: refreshToken.token,
    };
  }

  @Mutation('refreshToken')
  @UseGuards(AuthGraphqlGuard)
  async refreshToken(
    @CurrentUser() user: JWTPayload,
    @Args('token') token: string,
  ): Promise<AccessToken> {
    // check if refresh token is valid
    if (!(await this.refreshTokenService.isValid(user.sub, token))) {
      throw new Error('Invalid refresh token');
    }

    const jwt = await this.authService.refreshToken(user.sub);
    const refreshToken = await this.refreshTokenService.createToken(user.sub);

    return {
      token: jwt.token,
      exp: jwt.exp,
      refreshToken: refreshToken.token,
    };
  }
}
