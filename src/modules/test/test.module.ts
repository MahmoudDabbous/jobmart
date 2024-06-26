import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/database/entities/Test';
import { Question } from 'src/database/entities/Question';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, User])],
  controllers: [TestController],
  providers: [TestService, JwtService],
  exports: [TestService],
})
export class TestModule {}
