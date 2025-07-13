/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';

import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateProjectDto, UpdateProjectDto } from '@codebox/types';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(req.user, dto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('me/all')
  //   getMine(@Request() req) {
  //     return this.projectsService.findUserProjects(req.user.id);
  //   }

  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  update(
    @Request() req: any,
    @Param('slug') slug: string,
    @Body() dto: UpdateProjectDto
  ) {
    return this.projectsService.update(slug, req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  remove(@Request() req: any, @Param('slug') slug: string) {
    return this.projectsService.delete(slug, req.user.id);
  }
}
