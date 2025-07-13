import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class PaginationQuery {
  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Min(0)
  @IsInt()
  readonly offset?: number = 0;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly limit?: number = 20;
}

export class IdParams {
  @IsNotEmpty()
  id: string;
}
