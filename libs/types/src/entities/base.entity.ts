import { ApiHideProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AbstractEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiHideProperty()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}

export class PageInfoType {
  @Expose()
  limit: number;

  @Expose()
  offset: number;

  @Expose()
  total: number;
}

export abstract class Collection<T> {
  data: T[];

  @Expose()
  pageInfo: PageInfoType;
}

export class StatData {
  @Expose()
  label: string;
  @Expose()
  value: number | null;
}
