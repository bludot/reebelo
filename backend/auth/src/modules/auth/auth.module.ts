import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AuthConfig } from './auth.config';
import { AuthGuard } from './auth.guard';
import { AuthGraphqlGuard } from './auth.graphql.guard';
import { RefreshTokenModule } from '../refreshToken/refreshToken.module';

@Module({
  imports: [
    RefreshTokenModule,
    UserModule,
    ConfigModule.register(AuthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.register(AuthConfig)],
      useFactory: async (config: ConfigService<AuthConfig>) => ({
        global: true,
        secret: config.env.JWT_SECRET,
        signOptions: { expiresIn: config.env.JWT_EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthGuard, AuthGraphqlGuard],
  exports: [AuthService, AuthGuard, AuthGraphqlGuard],
})
export class AuthModule {}
