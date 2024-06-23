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
  DefaultValuePipe,
} from '@nestjs/common';
import { Experience } from 'src/database/entities/Experience';
import { ExperiencesService } from '../../services/experiences/experiences.service';
import { CreateExperienceDto } from '../../dtos/experience/create-experience.dto';
import { UpdateExperienceDto } from '../../dtos/experience/update-experience.dto';
import { ApplicantsService } from '../../services/applicants/applicants.service';

@Controller('applicants/:applicantId/experiences')
export class ExperiencesController {
  constructor(
    private readonly experiencesService: ExperiencesService,
    private readonly applicantService: ApplicantsService,
  ) {}

  @Post()
  async create(
    @Param('applicantId') applicantId: number,
    @Body() data: CreateExperienceDto,
  ) {
    const applicant = await this.applicantService.findOne(applicantId);
    const newExperience = await this.experiencesService.create(
      applicant.applicantId,
      data,
    );

    delete newExperience.applicant;

    return {
      ...newExperience,
      userId: applicant.user.userId,
    };
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
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return await this.experiencesService.findAll(applicantId, {
      page,
      limit,
      route: `http://localhost:3000/applicants/${applicantId}/experiences`,
    });
  }

  @Get(':experienceId')
  async findOne(
    @Param('experienceId') experienceId: number,
  ): Promise<Experience> {
    return await this.experiencesService.findOne(experienceId);
  }
}
