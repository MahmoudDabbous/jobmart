import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/Document';
import { DocumentController } from './controllers/document.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), MulterModule],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
