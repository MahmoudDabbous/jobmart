import { Module } from '@nestjs/common';
import { CustomEmailController } from './custom-email.controller';
import { CustomEmailService } from './custom-email.service';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [EmailModule, ConfigModule, TemplatesModule],
  controllers: [CustomEmailController],
  providers: [CustomEmailService],
})
export class CustomEmailModule {}
