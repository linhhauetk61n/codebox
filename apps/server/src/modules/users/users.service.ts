import { RegisterDto, UpdateUserDto, UserEntity } from '@codebox/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>
  ) {}

  async create(data: RegisterDto) {
    const user = this.usersRepo.create({
      email: data.email,
      username: data.username,
      passwordHash: data.password,
    });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, data: UpdateUserDto) {
    await this.usersRepo.update(id, data);
    return this.findById(id);
  }
}
