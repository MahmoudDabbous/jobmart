import { NestMiddleware } from '@nestjs/common';
import RequestWithUser from 'src/modules/auth/interfaces/requestWithUser.interface';

export class IsOwnerOrAdminMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: any, next: () => void) {
    if (
      (req.user.role === 'applicant' &&
        +req.params.applicantId === req.user.userId) ||
      req.user.role === 'admin'
    ) {
      next();
    } else {
      res.status(403).json({
        message: 'Unauthorized access',
      });
    }
  }
}
