import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/database/entities/User';
import { UsersService } from 'src/modules/users/users.service';
import RequestWithUser from 'src/modules/auth/interfaces/requestWithUser.interface';
import TokenPayload from 'src/modules/auth/interfaces/tokenPayload.interface';

@Injectable()
export class IsOwnerOrAdminMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.cookies.Authentication;

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    const decoded = this.jwtService.verify(token) as TokenPayload;

    const user = await this.usersService.getById(decoded.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (req.baseUrl.match('/me') && user.role === UserRole.APPLICANT) {
      req.user = user;
      return next();
    }

    if (user.role === UserRole.ADMIN && !req.baseUrl.match('/me')) {
      return next();
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
