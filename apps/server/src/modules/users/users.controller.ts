import { UpdateUserDto } from '@codebox/types';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':username')
  async getProfile(@Param('username') username: string) {
    const user = await this.usersService.findByEmail(username);
    if (!user) return { message: 'User not found' };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...publicData } = user;
    return publicData;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateProfile(id, body);
  }
}
