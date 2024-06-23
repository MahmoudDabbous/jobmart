import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApplicantsController } from './controllers/applicants/applicants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from 'src/database/entities/Applicant';
import { ApplicantsService } from './services/applicants/applicants.service';
import { EducationsService } from './services/educations/educations.service';
import { ExperiencesService } from './services/experiences/experiences.service';
import { EducationsController } from './controllers/educations/educations.controller';
import { ExperiencesController } from './controllers/experiences/experiences.controller';
import { Education } from 'src/database/entities/Education';
import { Experience } from 'src/database/entities/Experience';
import { UsersService } from '../users/users.service';
import { User } from 'src/database/entities/User';
import { IsOwnerOrAdminMiddleware } from './middlewares/is-owner-or-admin.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([Applicant, Education, Experience, User])],
  controllers: [
    ApplicantsController,
    EducationsController,
    ExperiencesController,
  ],
  providers: [
    ApplicantsService,
    EducationsService,
    ExperiencesService,
    UsersService,
  ],
})
export class ApplicantsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsOwnerOrAdminMiddleware).forRoutes('applicants/*');
  }
}
