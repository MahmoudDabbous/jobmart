import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/Document';
import { DocumentController } from './controllers/document.controller';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/User';
import { ApplicantsModule } from '../applicants/applicants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User]), ApplicantsModule],
  controllers: [DocumentController],
  providers: [DocumentService, UsersService, JwtService],
  exports: [DocumentService],
})
export class DocumentModule {}
