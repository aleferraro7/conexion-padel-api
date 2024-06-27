import { Request } from 'express';
import { User } from '../repository/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
