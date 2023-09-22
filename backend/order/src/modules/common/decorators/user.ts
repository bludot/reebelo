import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWTPayload } from '../../auth/auth.service';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JWTPayload => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
