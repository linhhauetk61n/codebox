import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RegisterDto, UserEntity } from '@codebox/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
    return {
      accessToken: this.jwt.sign({ sub: user.id, email: user.email }),
    };
  }

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.usersService.create({ ...dto, password: passwordHash });
  }

  async findUserById(id: string) {
    return this.usersService.findById(id);
  }
}
