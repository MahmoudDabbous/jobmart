import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EducationsService } from '../../services/educations/educations.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateEducationDto } from '../../dtos/education/create-education';
import { UpdateEducationDto } from '../../dtos/education/update-education.dto';

@Controller('applicants/:applicantId/educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Get()
  async findAll(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Query() query: IPaginationOptions,
  ) {
    return await this.educationsService.findAll(applicantId, query);
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
