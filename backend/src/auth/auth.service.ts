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
    // comparing the enter passwd with the hashed passwd in the db
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, username: user.username, role: user.role }; // comparing the username and passwd against what’s stored in the db
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // generate a the token so the clien will use this token for further authenticated requests
    };
  }
}
