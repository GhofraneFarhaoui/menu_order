import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'LINKEDIN_CLIENT_ID',
      clientSecret: 'LINKEDIN_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_liteprofile'],
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
