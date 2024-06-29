import { CreateJobDto } from '../../dto/jobs/create-job.dto';
import { UpdateJobDto } from './../../dto/jobs/update-job.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/Job';
import { Repository } from 'typeorm';
import { PlatformService } from '../platform/platform.service';
import { PositionService } from '../position/position.service';
import { CategoryService } from '../category/category.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

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
    const job = this.jobsRepasitory.create({
      description: data.description,
      name: data.name,
      numberOfVacancies: data.numberOfVacancies,
    });

    if (data.jobCategory) {
      job.jobCategory = await this.categoryService.findOne(data.jobCategory);
    }

    if (data.jobPosition) {
      job.jobPosition = await this.positionService.findOne(data.jobPosition);
    }

    if (data.jobPlatform) {
      job.jobPlatform = await this.platformService.findOne(data.jobPlatform);
    }

    return await this.jobsRepasitory.save(job);
  }

  async update(jobId: number, data: UpdateJobDto) {
    await this.jobsRepasitory.update(jobId, {
      description: data.description,
      name: data.name,
      jobCategory: { jobCategoryId: data.jobCategory },
      jobPosition: { jobPositionId: data.jobPosition },
      jobPlatform: { jobPlatformId: data.jobPlatform },
    });
    return await this.jobsRepasitory.findOne({
      where: { jobId },
      relations: ['jobCategory', 'jobPosition', 'jobPlatform'],
    });
  }

  async delete(jobId: number) {
    await this.jobsRepasitory.delete(jobId);
  }

  async findAll(pagination: IPaginationOptions) {
    return paginate<Job>(this.jobsRepasitory, pagination, {
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
