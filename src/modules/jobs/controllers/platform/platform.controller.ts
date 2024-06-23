import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
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
  async findOne(@Param('platformId', ParseIntPipe) platformId: number) {
    return await this.platformService.findOne(platformId);
  }

  @Post()
  async create(@Body() createPlatformDto: CreatePlatformDto) {
    return await this.platformService.create(createPlatformDto);
  }

  @Patch(':platformId')
  async update(
    @Param('platformId', ParseIntPipe) platformId: number,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return await this.platformService.update(platformId, updatePlatformDto);
  }

  @Delete(':platformId')
  async remove(@Param('platformId', ParseIntPipe) platformId: number) {
    return await this.platformService.delete(platformId);
  }

  @Get(':platformId/jobs')
  async findJobs(@Param('platformId', ParseIntPipe) platformId: number) {
    return await this.platformService.findJobs(platformId);
  }
}
