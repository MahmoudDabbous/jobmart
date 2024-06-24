import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/database/entities/Test';
import { Question } from 'src/database/entities/Question';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question])],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
