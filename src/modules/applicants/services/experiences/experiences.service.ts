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
  ) {}

  async create(
    applicantId: number,
    data: CreateExperienceDto,
  ): Promise<Experience> {
    const newExperience = await this.experienceRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const applicant = await transactionalEntityManager.findOne(Applicant, {
          where: { applicantId },
        });

        if (!applicant) {
          throw new NotFoundException(
            `Applicant with ID ${applicantId} not found`,
          );
        }

        const experience = this.experienceRepository.create(data);
        experience.applicant = applicant;
        return experience;
      },
    );

    return await this.experienceRepository.save(newExperience);
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
