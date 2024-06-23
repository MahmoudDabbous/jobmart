import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/database/entities/User';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class IsOwnerOrAdminMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.cookies.Authentication;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = this.jwtService.decode(authHeader) as { userId: string };

    if (!decoded || !decoded.userId) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.getById(+decoded.userId);

    if (user.role === UserRole.ADMIN) {
      return next();
    }

    if (
      user.role !== UserRole.APPLICANT &&
      user.userId !== +req.params['applicantId']
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  }
}
