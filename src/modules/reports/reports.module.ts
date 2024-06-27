import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/Job';
import { Applicant } from 'src/database/entities/Applicant';
import { Application } from 'src/database/entities/Application';
import { ReportsService } from './reports.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/database/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Applicant, Application, User])],
  controllers: [ReportsController],
  providers: [ReportsService, JwtService, UsersService],
})
export class ReportsModule {}
