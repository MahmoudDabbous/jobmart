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
  UseGuards,
} from '@nestjs/common';
import { JobsService } from '../../services/jobs/jobs.service';
import { CreateJobDto } from '../../dto/jobs/create-job.dto';
import { UpdateJobDto } from '../../dto/jobs/update-job.dto';
import RequestWithUser from 'src/modules/auth/interfaces/requestWithUser.interface';
import { ApplicantionService } from '../../services/applicantion/applicantion.service';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly applicantionService: ApplicantionService,
  ) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  async findAll() {
    return await this.jobsService.findAll();
  }

  @Get(':jobId')
  async findOne(@Param('jobId', ParseIntPipe) jobId: number) {
    return await this.jobsService.findOne(jobId);
  }

  @Patch(':jobId')
  async update(
    @Body() updateJobDto: UpdateJobDto,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    return await this.jobsService.update(jobId, updateJobDto);
  }

  @Delete(':jobId')
  async remove(@Param('jobId', ParseIntPipe) jobId: number) {
    return await this.jobsService.delete(jobId);
  }

  @Post(':jobId/apply')
  @UseGuards(JwtAuthGuard)
  async apply(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Req() req: RequestWithUser,
  ) {
    return await this.applicantionService.apply(req.user.userId, jobId);
  }
}
