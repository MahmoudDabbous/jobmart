import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PositionService } from '../../services/position/position.service';
import { CreatePositionDto } from '../../dto/position/create-position.dto';
import { UpdatePositionDto } from '../../dto/position/update-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAll() {
    return await this.positionService.findAll();
  }

  @Get(':positionId')
  async findOne(positionId: number) {
    return await this.positionService.findOne(positionId);
  }

  @Get(':positionId/jobs')
  async findJobs(positionId: number) {
    return await this.positionService.findJobs(positionId);
  }

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionService.create(createPositionDto);
  }

  @Patch(':positionId')
  async update(
    positionId: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return await this.positionService.update(positionId, updatePositionDto);
  }

  @Delete(':positionId')
  async remove(positionId: number) {
    return await this.positionService.delete(positionId);
  }
}
