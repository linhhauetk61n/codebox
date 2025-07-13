import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @Optional()
  @IsString()
  bio?: string;

  @Optional()
  @IsString()
  image?: string;
}
