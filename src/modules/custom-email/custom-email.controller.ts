import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SendCustomEmailDto } from './dtos/send-custom-email.dto';
import { CustomEmailService } from './custom-email.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@Controller('custom-email')
export class CustomEmailController {
  constructor(private readonly customEmailService: CustomEmailService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendCustomEmail(@Body() emailData: SendCustomEmailDto) {
    return this.customEmailService.sendCustomEmail(
      emailData.to,
      emailData.subject,
      emailData.content,
    );
  }
}
