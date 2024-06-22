import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import JwtRefreshGuard from './guards/jwtRefresh.guard';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpData: CreateUserDto) {
    return this.authService.signUp(signUpData);
  }

  @Post('admin/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  signUpAdmin(@Body() signUpData: CreateAdminDto) {
    return this.authService.signUpAdmin(signUpData);
  }

  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async signIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      user.userId,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.userId);
    await this.userService.setCurrentRefreshToken(refreshToken, user.userId);
    request.res.setHeader('Content-Type', 'application/json');
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    const { password, currentHashedRefreshToken, ...result } = user; // eslint-disable-line
    const userRes = { result };
    return JSON.stringify(userRes.result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    await this.userService.removeRefreshToken(request.user.userId);
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.status(200).json({
      statusCode: 200,
      message: 'Logout successful',
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    const { password, ...result } = user; // eslint-disable-line
    const userRes = { result };
    request.res.setHeader('Content-Type', 'application/json');
    return JSON.stringify(userRes.result);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.userId,
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
