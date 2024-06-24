import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPlatform } from 'src/database/entities/JobPlatform';
import { Repository } from 'typeorm';
import { CreatePlatformDto } from '../../dto/platform/create-platform.dto';
import { UpdatePlatformDto } from '../../dto/platform/update-platform.dto';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(JobPlatform)
    private readonly platformRepository: Repository<JobPlatform>,
  ) {}

  async create(data: CreatePlatformDto) {
    return await this.platformRepository.save(data);
  }

  async update(jobPlatformId: number, data: UpdatePlatformDto) {
    await this.platformRepository.update(jobPlatformId, data);
    return await this.platformRepository.findOne({
      where: { jobPlatformId },
    });
  }

  async delete(jobPlatformId: number) {
    await this.platformRepository.delete(jobPlatformId);
  }

  async findAll() {
    return await this.platformRepository.find();
  }

  async findOne(jobPlatformId: number) {
    return await this.platformRepository.findOne({
      where: { jobPlatformId },
    });
  }

  async findJobs(jobPlatformId: number) {
    return await this.platformRepository.findOne({
      where: { jobPlatformId },
      relations: ['jobs'],
    });
  }
}
