import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/database/entities/Question';
import { Test } from 'src/database/entities/Test';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Test])],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
