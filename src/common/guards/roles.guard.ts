import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se definió ningún rol en la ruta, permitimos el acceso
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    
    // Asumiendo que el JWT inyecta los roles en user.roles (configurado en JwtStrategy)
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
