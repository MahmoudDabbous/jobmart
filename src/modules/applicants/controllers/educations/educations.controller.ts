import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EducationsService } from '../../services/educations/educations.service';
import { CreateEducationDto } from '../../dtos/education/create-education.dto';
import { UpdateEducationDto } from '../../dtos/education/update-education.dto';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';
import { ApplicantsService } from '../../services/applicants/applicants.service';

@Controller('applicants/:applicantId/educations')
@UseGuards(JwtAuthGuard)
export class EducationsController {
  constructor(
    private readonly educationsService: EducationsService,
    private readonly applicantService: ApplicantsService,
  ) {}

  @Get()
  async findAll(@Param('applicantId', ParseIntPipe) applicantId: number) {
    const applicant = await this.applicantService.findOne(applicantId);
    return applicant.educations;
  }

  @Get(':educationId')
  async findOne(@Param('educationId', ParseIntPipe) educationId: number) {
    return await this.educationsService.findOne(educationId);
  }

  @Post('create')
  async create(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Body() data: CreateEducationDto,
  ) {
    const applicant = await this.applicantService.findOne(applicantId);
    const newEducation = await this.educationsService.create(
      applicant.applicantId,
      data,
    );

    delete newEducation.applicant;

    return {
      ...newEducation,
      userId: applicant.user.userId,
    };
  }

  @Patch(':educationId/update')
  async update(
    @Param('educationId', ParseIntPipe) educationId: number,
    @Body() data: UpdateEducationDto,
  ) {
    return await this.educationsService.update(educationId, data);
  }

  @Delete(':educationId/delete')
  async delete(@Param('educationId', ParseIntPipe) educationId: number) {
    return await this.educationsService.delete(educationId);
  }
}
