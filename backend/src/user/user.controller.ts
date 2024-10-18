import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard) //role guardextracts the user's role from the JWT payload
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @Roles('admin') // Only admin can access this endpoint
  async create(
    @Body() body: { username: string; password: string; role: string }
  ) {
    return this.userService.create(body.username, body.password, body.role);
  }
}
