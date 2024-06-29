import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradingInfo } from 'src/database/entities/GradingInfo';
import { Repository } from 'typeorm';
import { CreateGradingInfoDto } from './dtos/create-gradinginfo.dto';
import { UpdateGradingInfoDto } from './dtos/update-gradinginfo.dto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Application } from 'src/database/entities/Application';

@Injectable()
export class GradingInfoService {
  constructor(
    @InjectRepository(GradingInfo)
    private gradingInfoRepository: Repository<GradingInfo>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(
    createGradingInfoDto: CreateGradingInfoDto,
  ): Promise<GradingInfo> {
    const { applicationId, ...gradingInfoData } = createGradingInfoDto;
    const application = await this.applicationRepository.findOne({
      where: { applicationId },
    });
    if (!application) {
      throw new NotFoundException(
        `Application with ID ${applicationId} not found`,
      );
    }
    const gradingInfo = this.gradingInfoRepository.create({
      ...gradingInfoData,
      application,
    });
    const savedGradingInfo = await this.gradingInfoRepository.save(gradingInfo);
    return this.findOne(savedGradingInfo.gradingId);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<GradingInfo>> {
    const queryBuilder = this.gradingInfoRepository
      .createQueryBuilder('gradingInfo')
      .leftJoinAndSelect('gradingInfo.application', 'application')
      .select([
        'gradingInfo.gradingId',
        'gradingInfo.recruiterId',
        'gradingInfo.totalGrades',
        'gradingInfo.passFailStatus',
        'gradingInfo.answerDetails',
        'gradingInfo.createdAt',
        'gradingInfo.updatedAt',
        'application.applicationId',
      ]);

    const options = {
      page,
      limit,
      route: '/grading-info',
    };

    return paginate<GradingInfo>(queryBuilder, options);
  }

  async findOne(id: number): Promise<GradingInfo> {
    const gradingInfo = await this.gradingInfoRepository.findOne({
      where: { gradingId: id },
      relations: ['application'],
    });
    if (!gradingInfo) {
      throw new NotFoundException(`GradingInfo with ID ${id} not found`);
    }
    return gradingInfo;
  }

  async update(
    id: number,
    updateGradingInfoDto: UpdateGradingInfoDto,
  ): Promise<GradingInfo> {
    await this.findOne(id);
    await this.gradingInfoRepository.update(id, updateGradingInfoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.gradingInfoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GradingInfo with ID ${id} not found`);
    }
  }

  async findByApplicationId(applicationId: number): Promise<GradingInfo> {
    const gradingInfo = await this.gradingInfoRepository.findOne({
      where: { application: { applicationId } },
    });
    if (!gradingInfo) {
      throw new NotFoundException(
        `GradingInfo for application with ID ${applicationId} not found`,
      );
    }
    return gradingInfo;
  }

  async findByRecruiterId(recruiterId: number): Promise<GradingInfo[]> {
    return this.gradingInfoRepository.find({ where: { recruiterId } });
  }
}
