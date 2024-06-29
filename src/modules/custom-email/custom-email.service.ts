import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class CustomEmailService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly templatesService: TemplatesService,
  ) {}

  async sendCustomEmail(to: string, subject: string, content: string) {
    const context = {
      subject,
      content,
      logoUrl: this.configService.get<string>('LOGO_URL'),
      currentYear: new Date().getFullYear(),
    };

    const html = this.templatesService.generateHtml('general', context);

    return this.emailService.sendMail({
      to,
      subject,
      html,
    });
  }
}
