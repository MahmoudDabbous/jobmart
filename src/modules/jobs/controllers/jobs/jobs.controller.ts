import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { JobsService } from '../../services/jobs/jobs.service';
import { CreateJobDto } from '../../dto/jobs/create-job.dto';
import { UpdateJobDto } from '../../dto/jobs/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

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
}
