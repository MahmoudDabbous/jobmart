import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradingInfo } from 'src/database/entities/GradingInfo';
import { GradingInfoController } from './gradinginfo.controller';
import { GradingInfoService } from './gradinginfo.service';
import { Application } from 'src/database/entities/Application';

@Module({
  imports: [TypeOrmModule.forFeature([GradingInfo, Application])],
  controllers: [GradingInfoController],
  providers: [GradingInfoService],
  exports: [GradingInfoService],
})
export class GradinginfoModule {}
