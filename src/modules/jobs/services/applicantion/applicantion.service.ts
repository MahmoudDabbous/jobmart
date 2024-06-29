import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/database/entities/Application';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ApplicantsService } from 'src/modules/applicants/services/applicants/applicants.service';
import { JobsService } from 'src/modules/jobs/services/jobs/jobs.service';
import { DocumentService } from 'src/modules/document/services/document.service';
import { Test } from 'src/database/entities/Test';
// import { UpdateApplicationDto } from '../../dto/application/update-application.dto';

@Injectable()
export class ApplicantionService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly applicantService: ApplicantsService,
    private readonly jobService: JobsService,
    private readonly documentService: DocumentService,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}

  async apply(applicantId: number, jobId: number) {
    const applicant = await this.applicantService.findOne(applicantId);
    const job = await this.jobService.findOne(jobId);

    const application = await this.applicationRepository.save({
      applicant,
      job,
    });

    return application;
  }

  async findOne(applicationId: number) {
    const application = await this.applicationRepository.findOne({
      where: { applicationId },
      relations: ['applicant', 'job', 'applicant.user', 'test'],
    });

    const user = await this.applicantService.findOne(
      application.applicant.user.userId,
    );

    application.applicant = user;

    return application;
  }

  async findAll(pagination: IPaginationOptions) {
    const queryBuilder =
      this.applicationRepository.createQueryBuilder('applications');
    queryBuilder.leftJoinAndSelect('applications.applicant', 'applicant');
    queryBuilder.leftJoinAndSelect('applications.job', 'job');
    queryBuilder.leftJoinAndSelect('applicant.user', 'user');

    const applications = await paginate<Application>(queryBuilder, pagination);

    for (const application of applications.items) {
      const user = await this.applicantService.findOne(
        application.applicant.user.userId,
      );

      application.applicant = user;
    }

    return applications;
  }

  async delete(applicationId: number) {
    return await this.applicationRepository.delete(applicationId);
  }

  async uploadDocument(applicationId: number, document: Express.Multer.File) {
    const application = await this.findOne(applicationId);

    if (!application) {
      throw new Error('Application not found');
    }

    if (!document || document.mimetype !== 'application/pdf') {
      throw new Error('Invalid document. Please upload a PDF file.');
    }

    try {
      const createdDocument = await this.documentService.create({
        name: document.filename,
        url: document.path,
        extension: document.mimetype,
        size: document.size,
        applicantId: application.applicant.applicantId,
        applicationId: application.applicationId,
      });

      this.applicationRepository.update(applicationId, {
        document: { documentId: createdDocument.documentId },
      });

      return createdDocument;
    } catch (error) {
      throw new Error('Failed to upload document. Please try again later.');
    }
  }

  async downloadDocument(applicationId: number) {
    const application = await this.applicationRepository.findOne({
      where: { applicationId },
      relations: ['document'],
    });

    if (!application) {
      throw new Error('Application not found');
    }

    if (!application.document) {
      throw new Error('No document found for this application');
    }

    return application.document;
  }

  async findJobApplications(jobId: number, pagination: IPaginationOptions) {
    const queryBuilder =
      this.applicationRepository.createQueryBuilder('applications');
    queryBuilder.leftJoinAndSelect('applications.applicant', 'applicant');
    queryBuilder.leftJoinAndSelect('applications.job', 'job');
    queryBuilder.leftJoinAndSelect('applicant.user', 'user');

    queryBuilder.where('job.jobId = :jobId', { jobId });

    const applications = await paginate<Application>(queryBuilder, pagination);

    if (applications.meta.totalItems <= 0)
      throw new NotFoundException('job has no applications');

    for (const application of applications.items) {
      const user = await this.applicantService.findOne(
        application.applicant.user.userId,
      );
      application.applicant = user;
    }

    return applications;
  }

  async attachDocumentToApplication(applicationId: number, documentId: number) {
    await this.applicationRepository.update(
      {
        applicationId,
      },
      {
        document: { documentId },
      },
    );

    await this.documentService.attachToApplication(applicationId, documentId);

    return { message: 'Document attached to application successfully' };
  }

  async assignTest(
    applicationId: number,
    testId: number,
  ): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { applicationId },
      relations: ['test'],
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${applicationId} not found`,
      );
    }

    const test = await this.testRepository.findOne({
      where: { testId },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${testId} not found`);
    }

    application.test = test;
    return this.applicationRepository.save(application);
  }
}
