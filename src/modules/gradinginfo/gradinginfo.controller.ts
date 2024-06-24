import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { GradingInfoService } from './gradinginfo.service';
import { CreateGradingInfoDto } from './dtos/create-gradinginfo.dto';
import { UpdateGradingInfoDto } from './dtos/update-gradinginfo.dto';

@Controller('grading-info')
export class GradingInfoController {
  constructor(private readonly gradingInfoService: GradingInfoService) {}

  @Post()
  create(@Body() createGradingInfoDto: CreateGradingInfoDto) {
    return this.gradingInfoService.create(createGradingInfoDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.gradingInfoService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradingInfoService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGradingInfoDto: UpdateGradingInfoDto,
  ) {
    return this.gradingInfoService.update(+id, updateGradingInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradingInfoService.remove(+id);
  }

  @Get('application/:applicationId') // still need work on application
  findByApplicationId(@Param('applicationId') applicationId: string) {
    return this.gradingInfoService.findByApplicationId(+applicationId);
  }

  @Get('recruiter/:recruiterId') // still need work on recruiter
  findByRecruiterId(@Param('recruiterId') recruiterId: string) {
    return this.gradingInfoService.findByRecruiterId(+recruiterId);
  }
}
