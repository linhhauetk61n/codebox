import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'user@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'user',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'user',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
    required: true,
  })
  @IsString()
  password: string;
}
