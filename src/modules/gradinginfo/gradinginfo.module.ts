import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradingInfo } from 'src/database/entities/GradingInfo';
import { GradingInfoController } from './gradinginfo.controller';
import { GradingInfoService } from './gradinginfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([GradingInfo])],
  controllers: [GradingInfoController],
  providers: [GradingInfoService],
  exports: [GradingInfoService],
})
export class GradinginfoModule {}
