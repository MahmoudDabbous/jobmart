import {
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm')
  @Redirect('')
  async confirm(@Query('token') token: string) {
    try {
      const email =
        await this.emailConfirmationService.decodeConfirmationToken(token);
      await this.emailConfirmationService.confirmEmail(email);
      if (process.env.FRONTEND_URL) {
        return { url: process.env.FRONTEND_URL + '/email-confirm' };
      }
    } catch (error) {
      if (process.env.FRONTEND_URL) {
        return { url: process.env.FRONTEND_URL + '/email-fail' };
      }
    }
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Req() request: RequestWithUser) {
    await this.emailConfirmationService.resendConfirmationLink(
      request.user.userId,
    );
  }
}
