import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from 'src/database/entities/Experience';
import { Applicant } from 'src/database/entities/Applicant';
import { CreateExperienceDto } from '../../dtos/experience/create-experience.dto';
import { UpdateExperienceDto } from '../../dtos/experience/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  async create(
    applicantId: number,
    data: CreateExperienceDto,
  ): Promise<Experience> {
    const applicant = await this.applicantRepository.findOne({
      where: { applicantId },
    });
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
    const experience = this.experienceRepository.create(data);
    experience.applicant = applicant;
    return this.experienceRepository.save(experience);
  }

  async update(
    experienceId: number,
    data: UpdateExperienceDto,
  ): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { experienceId },
    });
    if (!experience) {
      throw new NotFoundException(
        `Experience with ID ${experienceId} not found`,
      );
    }
    Object.assign(experience, data);
    return this.experienceRepository.save(experience);
  }

  async delete(experienceId: number): Promise<void> {
    const deleteResult = await this.experienceRepository.delete(experienceId);
    if (!deleteResult.affected) {
      throw new NotFoundException(
        `Experience with ID ${experienceId} not found`,
      );
    }
  }

  async findAll(
    applicantId: number,
    pagination: IPaginationOptions,
  ): Promise<Pagination<Experience>> {
    const qb = this.experienceRepository.createQueryBuilder('education');
    qb.where('education.applicant.applicantId = :applicantId', { applicantId });
    return paginate<Experience>(qb, pagination);
  }

  async findOne(experienceId: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { experienceId },
    });
    if (!experience) {
      throw new NotFoundException(
        `Experience with ID ${experienceId} not found`,
      );
    }
    return experience;
  }
}