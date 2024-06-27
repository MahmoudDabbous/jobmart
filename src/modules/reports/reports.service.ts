import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from 'src/database/entities/Applicant';
import { Application } from 'src/database/entities/Application';
import { Job } from 'src/database/entities/Job';
import { Repository } from 'typeorm';
@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  private async getApplicanReport() {
    const totalApplicants = await this.applicantRepository.count();
    const totalApplicantsThatApplied = await this.applicationRepository.count();
    const totalApplicantsThatDidNotApply =
      totalApplicants - totalApplicantsThatApplied;

    return {
      totalApplicants,
      totalApplicantsThatApplied,
      totalApplicantsThatDidNotApply,
    };
  }

  private async getJobReport() {
    const totalJobs = await this.jobRepository.count();
    const totalJobsThatHaveApplications = await this.applicationRepository
      .createQueryBuilder('application')
      .select('DISTINCT application.jobId')
      .getCount();
    const totalJobsThatDoNotHaveApplications =
      totalJobs - totalJobsThatHaveApplications;

    return {
      totalJobs,
      totalJobsThatHaveApplications,
      totalJobsThatDoNotHaveApplications,
    };
  }

  private async getApplicationReport() {
    const totalApplications = await this.applicationRepository.count();
    const totalApplicationsWithTests = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.gradingInfo', 'gradingInfo')
      .getCount();
    const totalApplicationsWithoutTests =
      totalApplications - totalApplicationsWithTests;

    return {
      totalApplications,
      totalApplicationsWithTests,
      totalApplicationsWithoutTests,
    };
  }

  private async getRecentApplications() {
    return this.applicationRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['job', 'applicant'],
      take: 5,
    });
  }

  private async getRecentGradingInfo() {
    return this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.gradingInfo', 'gradingInfo')
      .orderBy('gradingInfo.updatedAt', 'DESC')
      .take(5)
      .getMany();
  }

  private async mostAppliedToJobs() {
    return this.jobRepository
      .createQueryBuilder('job')
      .leftJoin('job.applications', 'applications')
      .select([
        'job.*',
        'COUNT(applications.applicationId) AS application_count',
      ])
      .groupBy('job.jobId')
      .orderBy('application_count', 'DESC')
      .take(5)
      .getRawMany();
  }

  async getRecentApplicants() {
    return await this.applicantRepository
      .createQueryBuilder('applicant')
      .leftJoinAndSelect('applicant.user', 'user')
      .orderBy('user.createdAt', 'DESC')
      .select(['applicant', 'user'])
      .take(5)
      .getMany();
  }

  async getReports() {
    const applicantReport = await this.getApplicanReport();
    const jobReport = await this.getJobReport();
    const applicationReport = await this.getApplicationReport();
    const recentApplications = await this.getRecentApplications();
    const recentGradingInfo = await this.getRecentGradingInfo();
    const mostAppliedToJobs = await this.mostAppliedToJobs();
    const recentApplicants = await this.getRecentApplicants();

    applicationReport['recentApplications'] = recentApplications;
    applicationReport['recentGradingInfo'] = recentGradingInfo.map(
      (application) => ({
        ...application['gradingInfo'],
        applicationId: application['applicationId'],
      }),
    );

    applicantReport['recentApplicants'] = recentApplicants;

    jobReport['mostAppliedToJobs'] = mostAppliedToJobs;

    return {
      applicantReport,
      jobReport,
      applicationReport,
    };
  }
}
