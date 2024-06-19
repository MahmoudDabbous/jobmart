import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EducationsService } from '../../services/educations/educations.service';
import { CreateEducationDto } from '../../dtos/education/create-education.dto';
import { UpdateEducationDto } from '../../dtos/education/update-education.dto';

@Controller('applicants/:applicantId/educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Get()
  async findAll(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.educationsService.findAll(applicantId, {
      page,
      limit,
      route: `http://localhost:3000/applicants/${applicantId}/educations`,
    });
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
    return await this.educationsService.create(applicantId, data);
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
