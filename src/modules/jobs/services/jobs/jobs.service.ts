import { CreateJobDto } from '../../dto/jobs/create-job.dto';
import { UpdateJobDto } from './../../dto/jobs/update-job.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/Job';
import { Repository } from 'typeorm';
import { PlatformService } from '../platform/platform.service';
import { PositionService } from '../position/position.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepasitory: Repository<Job>,
    private readonly categoryService: CategoryService,
    private readonly positionService: PositionService,
    private readonly platformService: PlatformService,
  ) {}

  async create(data: CreateJobDto) {
    const job = this.jobsRepasitory.create(data);

    if (data.jobCategoryId) {
      job.jobCategory = await this.categoryService.findOne(data.jobCategoryId);
    }

    if (data.jobPositionId) {
      job.jobPosition = await this.positionService.findOne(data.jobPositionId);
    }

    if (data.jobPlatformId) {
      job.jobPlatform = await this.platformService.findOne(data.jobPlatformId);
    }

    // TODO: Add process service

    return await this.jobsRepasitory.save(job);
  }

  async update(jobId: number, data: UpdateJobDto) {
    await this.jobsRepasitory.update(jobId, data);
    return await this.jobsRepasitory.findOne({
      where: { jobId },
      relations: ['jobCategory', 'jobPosition', 'jobPlatform'],
    });
  }

  async delete(jobId: number) {
    await this.jobsRepasitory.delete(jobId);
  }

  async findAll() {
    return await this.jobsRepasitory.find({
      relations: ['jobCategory', 'jobPosition', 'jobPlatform'],
    });
  }

  async findOne(jobId: number) {
    return await this.jobsRepasitory.findOne({
      where: { jobId },
      relations: ['jobCategory', 'jobPosition', 'jobPlatform'],
    });
  }
}
