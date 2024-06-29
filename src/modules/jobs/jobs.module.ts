import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs/jobs.controller';
import { JobsService } from './services/jobs/jobs.service';
import { CategoryController } from './controllers/category/category.controller';
import { PlatformController } from './controllers/platform/platform.controller';
import { PositionController } from './controllers/position/position.controller';
import { PositionService } from './services/position/position.service';
import { PlatformService } from './services/platform/platform.service';
import { CategoryService } from './services/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/Job';
import { JobCategory } from 'src/database/entities/JobCategory';
import { JobPlatform } from 'src/database/entities/JobPlatform';
import { JobPosition } from 'src/database/entities/JobPosition';
import { ApplicantionService } from './services/applicantion/applicantion.service';
import { Application } from 'src/database/entities/Application';
import { Applicant } from 'src/database/entities/Applicant';
import { ApplicantsModule } from '../applicants/applicants.module';
import { UsersModule } from '../users/users.module';
import { ApplicantionController } from './controllers/applicantion/applicantion.controller';
import { DocumentModule } from '../document/document.module';
import { UsersService } from '../users/users.service';
import { User } from 'src/database/entities/User';
import { JwtService } from '@nestjs/jwt';
import { Test } from 'src/database/entities/Test';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Job,
      JobCategory,
      JobPlatform,
      JobPosition,
      Application,
      Applicant,
      User,
      Test,
    ]),
    ApplicantsModule,
    UsersModule,
    DocumentModule,
  ],
  controllers: [
    JobsController,
    CategoryController,
    PlatformController,
    PositionController,
    ApplicantionController,
  ],
  providers: [
    JobsService,
    CategoryService,
    PlatformService,
    PositionService,
    ApplicantionService,
    UsersService,
    JwtService,
  ],
  exports: [JobsService, CategoryService, PlatformService, PositionService],
})
export class JobsModule {}
