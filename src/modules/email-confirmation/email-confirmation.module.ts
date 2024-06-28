import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/database/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), TemplatesModule],
  providers: [EmailConfirmationService, JwtService, EmailService, UsersService],
  controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
