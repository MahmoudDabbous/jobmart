import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApplicantsService } from '../../services/applicants/applicants.service';
import { Applicant } from 'src/database/entities/Applicant';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get()
  async findAll(@Query() pagination: IPaginationOptions) {
    return await this.applicantsService.findAll(pagination);
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
