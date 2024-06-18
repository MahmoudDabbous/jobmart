import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { Applicant } from 'src/database/entities/Applicant';
import { Education } from 'src/database/entities/Education';
import { CreateEducationDto } from '../../dtos/education/create-education';
import { UpdateEducationDto } from '../../dtos/education/update-education.dto';
import { ApplicantsService } from '../applicants/applicants.service';

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Applicant)
    private readonly applicantService: ApplicantsService,
  ) {}

  async create(
    applicantId: number,
    data: CreateEducationDto,
  ): Promise<Education> {
    const applicant = await this.applicantService.findOne(applicantId);
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
    const education = this.educationRepository.create(data);
    education.applicant = applicant;
    return await this.educationRepository.save(education);
  }

  async update(
    educationId: number,
    data: UpdateEducationDto,
  ): Promise<Education> {
    const education = await this.educationRepository.findOne({
      where: { educationId },
    });
    if (!education) {
      throw new NotFoundException(`Education with ID ${educationId} not found`);
    }
    Object.assign(education, data);
    return await this.educationRepository.save(education);
  }

  async delete(educationId: number): Promise<void> {
    const deleteResult = await this.educationRepository.delete(educationId);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Education with ID ${educationId} not found`);
    }
  }

  async findAll(
    applicantId: number,
    pagination: IPaginationOptions,
  ): Promise<Pagination<Education>> {
    const qb = this.educationRepository.createQueryBuilder('education');
    qb.where('education.applicant.applicantId = :applicantId', { applicantId });
    return paginate<Education>(qb, pagination);
  }

  async findOne(educationId: number): Promise<Education> {
    const education = await this.educationRepository.findOne({
      where: { educationId },
    });
    if (!education) {
      throw new NotFoundException(`Education with ID ${educationId} not found`);
    }
    return education;
  }
}