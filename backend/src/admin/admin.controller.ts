import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.adminService.createAdmin(username, password); //create a new admn user
  }
}
