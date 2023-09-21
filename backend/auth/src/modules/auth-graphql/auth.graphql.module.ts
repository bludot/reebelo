import { Module } from '@nestjs/common';
import { AuthResolvers } from './auth.resolvers';
import { AuthModule } from '../auth/auth.module';
import { RefreshTokenModule } from '../refreshToken/refreshToken.module';
import { ConfigModule } from '../config/config.module';
import { AuthConfig } from '../auth/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule.register(AuthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.register(AuthConfig)],
      useFactory: async (config: ConfigService<AuthConfig>) => ({
        global: true,
        secret: config.env.JWT_SECRET,
        signOptions: {
          expiresIn: config.env.JWT_EXPIRES_IN,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RefreshTokenModule,
  ],
  providers: [AuthResolvers],
})
export class AuthGraphqlModule {}
