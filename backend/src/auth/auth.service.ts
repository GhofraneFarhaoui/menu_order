import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // fetch user info from the db
    private readonly jwtService: JwtService // create tokens
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    console.log('User found:', user);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);

      if (isPasswordValid) {
        return { id: user.id, username: user.username, role: user.role };
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role }; // add role
    return {
      access_token: this.jwtService.sign(payload), // generate a the token so the clien will use this token for further authenticated requests
    };
  }
}
