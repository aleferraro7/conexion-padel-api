import { Request } from 'express';
import { User } from 'src/users/repository/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
