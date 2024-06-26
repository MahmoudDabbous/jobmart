import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const frontendUrl = process.env.FRONTEND_URL;
  const adminDashboardUrl = process.env.ADMIN_DASHBOARD_URL;
  if (frontendUrl || adminDashboardUrl) {
    app.enableCors({
      origin: [frontendUrl, adminDashboardUrl],
      credentials: true,
    });
  }
  //   app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
