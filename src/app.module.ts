import { DatabaseModule } from './database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ApplicantsModule } from './modules/applicants/applicants.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JobsModule } from './modules/jobs/jobs.module';
import { TestModule } from './modules/test/test.module';
import { QuestionModule } from './modules/question/question.module';
import { GradinginfoModule } from './modules/gradinginfo/gradinginfo.module';
import { DocumentModule } from './modules/document/document.module';
import { ReportsModule } from './modules/reports/reports.module';
import { EmailModule } from './modules/email/email.module';
import { EmailConfirmationModule } from './modules/email-confirmation/email-confirmation.module';
import { TemplatesModule } from './modules/templates/templates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      wildcard: true,
    }),
    DatabaseModule,
    ApplicantsModule,
    UsersModule,
    AuthModule,
    JobsModule,
    TestModule,
    QuestionModule,
    GradinginfoModule,
    DocumentModule,
    ReportsModule,
    EmailModule,
    EmailConfirmationModule,
    TemplatesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
