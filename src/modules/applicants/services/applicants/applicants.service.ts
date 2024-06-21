import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from 'src/database/entities/Applicant';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UsersService } from 'src/modules/users/users.service';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_CREATED } from 'src/common/constants/events';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
    private readonly userService: UsersService,
  ) {}

  async findAll(
    pagination: IPaginationOptions,
  ): Promise<Pagination<Applicant>> {
    const qb = this.applicantRepository.createQueryBuilder('applicant');
    qb.leftJoinAndSelect('applicant.user', 'user');
    qb.leftJoinAndSelect('applicant.experiences', 'experiences');
    qb.leftJoinAndSelect('applicant.educations', 'educations');
    qb.select([
      'applicant',
      'user.userId',
      'user.firstName',
      'user.lastName',
      'user.email',
      'user.phone',
      'experiences',
      'educations',
    ]);
    return paginate<Applicant>(qb, pagination);
  }

  async findOne(applicantId: number): Promise<Applicant> {
    const qb = this.applicantRepository.createQueryBuilder('applicant');
    qb.leftJoinAndSelect('applicant.user', 'user');
    qb.leftJoinAndSelect('applicant.experiences', 'experiences');
    qb.leftJoinAndSelect('applicant.educations', 'educations');
    qb.select([
      'applicant',
      'user.userId',
      'user.firstName',
      'user.lastName',
      'user.email',
      'user.phone',
      'experiences',
      'educations',
    ]);
    qb.where('user.userId = :userId', { userId: applicantId });
    const applicant = await qb.getOne();
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
    return applicant;
  }

  async update(
    applicantId: number,
    updateApplicantDto: UpdateUserDto,
  ): Promise<Applicant> {
    const applicant = await this.findOne(applicantId);

    const userId = applicant.user.userId;

    const user = await this.userService.update(userId, updateApplicantDto);

    applicant.user = user;

    return applicant;
  }
  async remove(applicantId: number): Promise<void> {
    const user = await this.findOne(applicantId);

    const deleteResult = await this.applicantRepository.delete({
      applicantId: user.applicantId,
    });

    if (!deleteResult.affected) {
      throw new NotFoundException(`Applicant with ID ${applicantId} not found`);
    }
  }

  async profileIsComplete(userId: number): Promise<boolean> {
    const user = await this.userService.getById(userId);
    const applicant = await this.applicantRepository.findOne({
      where: { user: user },
    });
    if (!applicant) {
      return false;
    }
    return true;
  }

  @OnEvent(USER_CREATED)
  async handleUserCreation(payload: any) {
    const user = await this.userService.getById(payload.userId);
    const applicant = this.applicantRepository.create();
    applicant.user = user;
    await this.applicantRepository.save(applicant);
  }
}
