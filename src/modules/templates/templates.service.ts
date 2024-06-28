import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class TemplatesService implements OnModuleInit {
  private templates: { [key: string]: Handlebars.TemplateDelegate } = {};

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.loadTemplates();
  }

  private loadTemplates() {
    const templatesDir = this.configService.get<string>('EMAIL_TEMPLATES_DIR');
    fs.readdirSync(templatesDir).forEach((file) => {
      if (path.extname(file) === '.hbs') {
        const templateName = path.basename(file, '.hbs');
        const templateContent = fs.readFileSync(
          path.join(templatesDir, file),
          'utf-8',
        );
        this.templates[templateName] = Handlebars.compile(templateContent);
      }
    });
  }

  generateHtml(templateName: string, context: any): string {
    if (!this.templates[templateName]) {
      throw new Error(`Template ${templateName} not found`);
    }
    return this.templates[templateName](context);
  }
}
