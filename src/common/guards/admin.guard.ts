import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/database/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
      const secret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      const user = await this.userRepository.findOne({
        where: { userId: payload.userId },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      // Check if the user role is ADMIN
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException('Admin access required');
      }

      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid token or insufficient permissions',
      );
    }
  }

  private extractTokenFromCookie(request: any): string | undefined {
    if (request.cookies && request.cookies.Authentication) {
      return request.cookies.Authentication;
    }
    return undefined;
  }
}
