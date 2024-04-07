import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // Type,
  // mixin,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role.enum';
// import { RequestWithUser } from '../request-with-user.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user.role === Role.ADMIN) {
      return true;
    }
    return role === user.role;
  }
}

// export const RoleGuard = (role: Role): Type<CanActivate> => {
//   class RoleGuardMixin implements CanActivate {
//     canActivate(context: ExecutionContext) {
//       const request = context.switchToHttp().getRequest<RequestWithUser>();
//       const user = request.user;

//       return user?.roles.includes(role);
//     }
//   }
//   return mixin(RoleGuardMixin);
// };
