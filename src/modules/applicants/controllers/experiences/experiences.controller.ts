import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { Experience } from 'src/database/entities/Experience';
import { ExperiencesService } from '../../services/experiences/experiences.service';
import { CreateExperienceDto } from '../../dtos/experience/create-experience.dto';
import { UpdateExperienceDto } from '../../dtos/experience/update-experience.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('applicants/:applicantId/experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  async create(
    @Param('applicantId') applicantId: number,
    @Body() data: CreateExperienceDto,
  ): Promise<Experience> {
    return await this.experiencesService.create(applicantId, data);
  }

  @Patch(':experienceId')
  async update(
    @Param('experienceId') experienceId: number,
    @Body() data: UpdateExperienceDto,
  ): Promise<Experience> {
    return await this.experiencesService.update(experienceId, data);
  }

  @Delete(':experienceId')
  async delete(@Param('experienceId') experienceId: number): Promise<void> {
    return await this.experiencesService.delete(experienceId);
  }

  @Get()
  async findAll(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Query() query: IPaginationOptions,
  ) {
    return await this.experiencesService.findAll(applicantId, query);
  }

  @Get(':experienceId')
  async findOne(
    @Param('experienceId') experienceId: number,
  ): Promise<Experience> {
    return await this.experiencesService.findOne(experienceId);
  }
}
