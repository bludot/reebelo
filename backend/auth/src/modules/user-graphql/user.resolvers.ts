import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { Logger } from 'winston';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGraphqlGuard } from '../auth/auth.graphql.guard';
import { CurrentUser } from '../common/decorators/user';
import { JWTPayload } from '../auth/auth.service';
import { User } from '../../graphql';
import { UserEntity } from '../user/repository/user.entity';

@Resolver()
export class UserResolvers {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Query('profile')
  @UseGuards(AuthGraphqlGuard)
  async profile(@CurrentUser() loggedInUser: JWTPayload): Promise<User> {
    this.logger.info('Getting profile');
    const user: UserEntity = await this.userService.getUserByUID(
      loggedInUser.sub,
    );
    return {
      id: user.id.toString(),
      uid: user.uid,
      username: user.username,
    };
  }
}
