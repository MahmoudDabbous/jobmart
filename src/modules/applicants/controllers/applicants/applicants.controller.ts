import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApplicantsService } from '../../services/applicants/applicants.service';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.applicantsService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/applicants',
    });
  }

  @Get(':applicantId')
  async findOne(
    @Param('applicantId', ParseIntPipe)
    applicantId: number,
  ) {
    return await this.applicantsService.findOne(applicantId);
  }

  @Patch(':applicantId')
  async update(
    @Param('applicantId', ParseIntPipe) applicantId: number,
    @Body() applicant: UpdateUserDto,
  ) {
    return this.applicantsService.update(applicantId, applicant);
  }

  @Delete(':applicantId')
  async remove(@Param('applicantId', ParseIntPipe) applicantId: number) {
    return await this.applicantsService.remove(applicantId);
  }

  @Get('check-profile/:userId')
  async profileIsComplete(userId: number) {
    return await this.applicantsService.profileIsComplete(userId);
  }
}
