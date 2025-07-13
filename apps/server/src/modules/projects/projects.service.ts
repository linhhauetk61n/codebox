import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectDto,
  ProjectEntity,
  UpdateProjectDto,
  UserEntity,
} from '@codebox/types';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>
  ) {}

  async create(user: UserEntity, dto: CreateProjectDto) {
    const slug = slugify(`${user.username}-${dto.title}-${Date.now()}`, {
      lower: true,
      strict: true,
    });
    const project = this.projectRepo.create({
      ...dto,
      slug,
      author: user,
    });
    return this.projectRepo.save(project);
  }

  async findBySlug(slug: string) {
    const project = await this.projectRepo.findOne({ where: { slug } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(slug: string, userId: string, dto: UpdateProjectDto) {
    const project = await this.findBySlug(slug);
    if (project.author.id !== userId) throw new NotFoundException();
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async delete(slug: string, userId: string) {
    const project = await this.findBySlug(slug);
    if (project.author.id !== userId) throw new NotFoundException();
    return this.projectRepo.softDelete(project);
  }
}
