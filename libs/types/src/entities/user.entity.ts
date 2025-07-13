import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ProjectEntity } from './project.enity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => ProjectEntity, (project) => project.author)
  projects: ProjectEntity[];
}
