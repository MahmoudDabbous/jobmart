import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from '../../services/position/position.service';
import { CreatePositionDto } from '../../dto/position/create-position.dto';
import { UpdatePositionDto } from '../../dto/position/update-position.dto';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return await this.positionService.findAll({ page, limit });
  }

  @Get(':positionId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('positionId', ParseIntPipe) positionId: number) {
    return await this.positionService.findOne(positionId);
  }

  @Get(':positionId/jobs')
  @UseGuards(JwtAuthGuard)
  async findJobs(@Param('positionId', ParseIntPipe) positionId: number) {
    return await this.positionService.findJobs(positionId);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionService.create(createPositionDto);
  }

  @Patch(':positionId')
  @UseGuards(AdminGuard)
  async update(
    @Param('positionId', ParseIntPipe) positionId: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return await this.positionService.update(positionId, updatePositionDto);
  }

  @Delete(':positionId')
  @UseGuards(AdminGuard)
  async remove(@Param('positionId', ParseIntPipe) positionId: number) {
    return await this.positionService.delete(positionId);
  }
}
