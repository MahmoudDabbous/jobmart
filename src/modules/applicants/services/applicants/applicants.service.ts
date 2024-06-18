import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from 'src/database/entities/Applicant';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  async findAll(): Promise<Applicant[]> {
    return this.applicantRepository.find();
  }

  async findOne(applicantId: number): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { applicantId: applicantId },
    });
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
    return applicant;
  }

  async update(applicantId: number, applicant: Applicant): Promise<Applicant> {
    await this.applicantRepository.update(applicantId, applicant);
    const updatedApplicant = await this.applicantRepository.findOne({
      where: { applicantId: applicantId },
    });
    if (!updatedApplicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
    return updatedApplicant;
  }

  async remove(applicantId: number): Promise<void> {
    const deleteResult = await this.applicantRepository.delete(applicantId);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
  }
}
