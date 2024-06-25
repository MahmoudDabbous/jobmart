import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApplicantsService } from '../../services/applicants/applicants.service';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import RequestWithUser from 'src/modules/auth/interfaces/requestWithUser.interface';
import { ExperiencesService } from '../../services/experiences/experiences.service';
import { EducationsService } from '../../services/educations/educations.service';
import { UpdateEducationDto } from '../../dtos/education/update-education.dto';
import { UpdateExperienceDto } from '../../dtos/experience/update-experience.dto';
import { CreateEducationDto } from '../../dtos/education/create-education.dto';
import { CreateExperienceDto } from '../../dtos/experience/create-experience.dto';

@Controller('me')
export class MeController {
  constructor(
    private readonly applicantsService: ApplicantsService,
    private readonly experienceService: ExperiencesService,
    private readonly educationService: EducationsService,
  ) {}

  @Get()
  async findOne(
    @Req()
    req: RequestWithUser,
  ) {
    console.log(req.user);
    return await this.applicantsService.findOne(req.user.userId);
  }

  @Patch()
  async update(@Req() req: RequestWithUser, @Body() applicant: UpdateUserDto) {
    return this.applicantsService.update(req.user.userId, applicant);
  }

  @Delete()
  async remove(@Req() req: RequestWithUser) {
    return await this.applicantsService.remove(req.user.userId);
  }

  @Get('check-profile')
  async profileIsComplete(@Req() req: RequestWithUser) {
    return await this.applicantsService.profileIsComplete(req.user.userId);
  }

  @Get('educations')
  async getEducations(@Req() req: RequestWithUser) {
    return await this.educationService.findAll(req.user.userId);
  }

  @Get('experiences')
  async getExperiences(@Req() req: RequestWithUser) {
    return await this.experienceService.findAll(req.user.userId);
  }

  @Get('educations/:educationId')
  async getEducation(@Param('educationId', ParseIntPipe) educationId: number) {
    return await this.educationService.findOne(educationId);
  }

  @Get('experiences/:experienceId')
  async getExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ) {
    return await this.experienceService.findOne(experienceId);
  }

  @Patch('educations/:educationId')
  async updateEducation(
    @Param('educationId', ParseIntPipe) educationId: number,
    @Body() data: UpdateEducationDto,
  ) {
    return await this.educationService.update(educationId, data);
  }

  @Patch('experiences/:experienceId')
  async updateExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @Body() data: UpdateExperienceDto,
  ) {
    return await this.experienceService.update(experienceId, data);
  }

  @Delete('educations/:educationId')
  async deleteEducation(
    @Param('educationId', ParseIntPipe) educationId: number,
  ) {
    return await this.educationService.delete(educationId);
  }

  @Delete('experiences/:experienceId')
  async deleteExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ) {
    return await this.experienceService.delete(experienceId);
  }

  @Post('educations')
  async createEducation(
    @Req() req: RequestWithUser,
    @Body() data: CreateEducationDto,
  ) {
    return await this.educationService.create(req.user.userId, data);
  }

  @Post('experiences')
  async createExperience(
    @Req() req: RequestWithUser,
    @Body() data: CreateExperienceDto,
  ) {
    return await this.experienceService.create(req.user.userId, data);
  }
}
