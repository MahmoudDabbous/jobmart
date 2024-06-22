import { CreateJobDto } from '../../dto/jobs/create-job.dto';
import { UpdateJobDto } from './../../dto/jobs/update-job.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/Job';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepasitory: Repository<Job>,
  ) {}

  async create(data: CreateJobDto) {
    return await this.jobsRepasitory.save(data);
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
