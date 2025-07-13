import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  html: string;

  @IsString()
  css: string;

  @IsString()
  js: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
