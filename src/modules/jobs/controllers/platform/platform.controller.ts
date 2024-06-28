import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { PlatformService } from '../../services/platform/platform.service';
import { UpdatePlatformDto } from '../../dto/platform/update-platform.dto';
import { CreatePlatformDto } from '../../dto/platform/create-platform.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return await this.platformService.findAll({ page, limit });
  }

  @Get(':platformId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('platformId', ParseIntPipe) platformId: number) {
    return await this.platformService.findOne(platformId);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createPlatformDto: CreatePlatformDto) {
    return await this.platformService.create(createPlatformDto);
  }

  @Patch(':platformId')
  @UseGuards(AdminGuard)
  async update(
    @Param('platformId', ParseIntPipe) platformId: number,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return await this.platformService.update(platformId, updatePlatformDto);
  }

  @Delete(':platformId')
  @UseGuards(AdminGuard)
  async remove(@Param('platformId', ParseIntPipe) platformId: number) {
    return await this.platformService.delete(platformId);
  }

  @Get(':platformId/jobs')
  @UseGuards(AdminGuard)
  async findJobs(@Param('platformId', ParseIntPipe) platformId: number) {
    return await this.platformService.findJobs(platformId);
  }
}
