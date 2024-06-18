import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApplicantsService } from '../../services/applicants/applicants.service';
import { Applicant } from 'src/database/entities/Applicant';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.applicantsService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/applicants',
    });
  }

  @Get(':applicantId')
  async findOne(
    @Param('applicantId', ParseIntPipe)
    applicantId: number,
  ) {
    return await this.applicantsService.findOne(applicantId);
  }

  async update(applicantId: number, applicant: Applicant) {
    return this.applicantsService.update(applicantId, applicant);
  }

  async remove(applicantId: number) {
    return await this.applicantsService.remove(applicantId);
  }
}
