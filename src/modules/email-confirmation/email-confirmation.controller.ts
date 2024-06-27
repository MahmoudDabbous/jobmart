import { Body, Controller, Get } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import ConfirmEmailDto from './dtos/confirm-email.dto';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }
}
