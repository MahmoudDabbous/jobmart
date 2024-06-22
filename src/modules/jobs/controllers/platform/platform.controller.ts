import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { PlatformService } from '../../services/platform/platform.service';
import { UpdatePlatformDto } from '../../dto/platform/update-platform.dto';
import { CreatePlatformDto } from '../../dto/platform/create-platform.dto';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get()
  async findAll() {
    return await this.platformService.findAll();
  }

  @Get(':platformId')
  async findOne(platformId: number) {
    return await this.platformService.findOne(platformId);
  }

  @Post()
  async create(@Body() createPlatformDto: CreatePlatformDto) {
    return await this.platformService.create(createPlatformDto);
  }

  @Patch(':platformId')
  async update(
    platformId: number,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return await this.platformService.update(platformId, updatePlatformDto);
  }

  @Delete(':platformId')
  async remove(platformId: number) {
    return await this.platformService.delete(platformId);
  }

  @Get(':platformId/jobs')
  async findJobs(platformId: number) {
    return await this.platformService.findJobs(platformId);
  }
}
