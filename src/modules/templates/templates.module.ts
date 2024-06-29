import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
