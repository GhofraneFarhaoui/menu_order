import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'FACEBOOK_CLIENT_ID',
      clientSecret: 'FACEBOOK_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function
  ) {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    const validatedUser = await this.authService.validateOAuthUser(user);
    done(null, validatedUser);
  }
}
