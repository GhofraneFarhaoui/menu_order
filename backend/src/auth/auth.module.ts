import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { LinkedInStrategy } from './linkedin.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './googl.tsrategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
    LinkedInStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
