import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { RegisterDto, LoginDto } from '@codebox/types';

import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getProfile(@Request() req: any) {
    return this.userService.findById(req.user.id);
  }
}
