import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosition } from 'src/database/entities/JobPosition';
import { Repository } from 'typeorm';
import { CreatePositionDto } from '../../dto/position/create-position.dto';
import { UpdatePositionDto } from '../../dto/position/update-position.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(JobPosition)
    private readonly positionRepository: Repository<JobPosition>,
  ) {}

  async create(data: CreatePositionDto) {
    return await this.positionRepository.save(data);
  }

  async update(jobPositionId: number, data: UpdatePositionDto) {
    await this.positionRepository.update(jobPositionId, data);
    return await this.positionRepository.findOne({
      where: { jobPositionId },
    });
  }

  async delete(jobPositionId: number) {
    await this.positionRepository.delete(jobPositionId);
  }

  async findAll(pagination: IPaginationOptions) {
    return paginate<JobPosition>(this.positionRepository, pagination, {
      relations: ['jobs'],
    });
  }

  async findOne(jobPositionId: number) {
    return await this.positionRepository.findOne({
      where: { jobPositionId },
    });
  }

  async findJobs(jobPositionId: number) {
    return await this.positionRepository.findOne({
      where: { jobPositionId },
      relations: ['jobs'],
    });
  }
}
