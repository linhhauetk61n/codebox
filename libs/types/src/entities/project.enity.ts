import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { UserEntity } from './user.entity';

export enum ProjectStatus {
  Draft = 'draft',
  Public = 'public',
  Private = 'private',
}

@Entity('projects')
export class ProjectEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  html: string;

  @Column({ type: 'text' })
  css: string;

  @Column({ type: 'text' })
  js: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: ProjectStatus.Draft, enum: ProjectStatus })
  status: ProjectStatus;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
}
