import { Request } from 'express';
import { User } from 'src/database/entities/User';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
