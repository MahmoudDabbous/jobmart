import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import VerificationTokenPayload from './interfaces/verificationTokenPayload.interface';
import { UsersService } from '../users/users.service';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
    private readonly templatesService: TemplatesService,
  ) {}

  async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });
    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
    const user = await this.userService.getByEmail(email);

    const context = {
      subject: 'JobMart | Email confirmation',
      content: `
      Hey ${user.firstName},<br><br>

      Thank you for registering with JobMart. To complete your registration and verify your email address, please click the link below:<br><br>

      <a href="${url}">Verify Email</a><br><br>

      If you didn't register for JobMart, you can safely ignore this email.<br><br>

      Best regards,<br>
      The JobMart Team
      `,
      logoUrl: this.configService.get<string>('LOGO_URL'),
      currentYear: new Date().getFullYear(),
    };

    const html = this.templatesService.generateHtml('general', context);

    return this.emailService.sendMail({
      to: email,
      subject: 'JobMart | Email confirmation',
      html,
    });
  }

  async confirmEmail(email: string) {
    const user = await this.userService.getByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.userService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }
}
