import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Applicant } from './entities/Applicant';
import { Education } from './entities/Education';
import { Experience } from './entities/Experience';
import { Admin } from './entities/Admin';
import { Job } from './entities/Job';
import { JobCategory } from './entities/JobCategory';
import { Application } from './entities/Application';
import { JobPosition } from './entities/JobPosition';
import { JobPlatform } from './entities/JobPlatform';
import { Organization } from './entities/Organization';
import { Document } from './entities/Document';
import { ApplicationDocument } from './entities/ApplicationDocument';
import { ApplicationTest } from './entities/ApplicationTest';
import { Answers } from './entities/Answer';
import { ApplicationEvaluation } from './entities/ApplicationEvaluation';
import { ApplicationStatus } from './entities/ApplicationStatus';
import { ApplicationStatusChange } from './entities/ApplicationStatusChange';
import { Interview } from './entities/Interview';
import { InterviewNote } from './entities/InterviewNote';
import { Process } from './entities/Process';
import { ProcessStep } from './entities/ProcessStep';
import { Recruiter } from './entities/Recruiter';
import { Step } from './entities/Step';
import { Test } from './entities/Test';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        entities: [
          Admin,
          Answers,
          Applicant,
          Application,
          ApplicationDocument,
          ApplicationEvaluation,
          ApplicationStatus,
          ApplicationStatusChange,
          ApplicationTest,
          Document,
          Education,
          Experience,
          Interview,
          InterviewNote,
          Job,
          JobCategory,
          JobPlatform,
          JobPosition,
          Organization,
          Process,
          ProcessStep,
          Recruiter,
          Step,
          Test,
          User,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
