import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '../config/config.service';
import { AuthConfig } from '../auth/auth.config';
import { AuthGuard } from './auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthenticationError } from '@nestjs/apollo';

@Injectable()
export class AuthGraphqlGuard extends AuthGuard {
  constructor(config: ConfigService<AuthConfig>, jwtService: JwtService) {
    super(config, jwtService);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx);
    const { req } = context.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
