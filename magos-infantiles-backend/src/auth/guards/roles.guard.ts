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

    console.log('Roles requeridos:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('Usuario en RolesGuard:', user);

    if (!user || !user.role) {
      console.log('Usuario no tiene rol definido');
      return false;
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    console.log('¿Tiene el rol requerido?:', hasRole);
    console.log('Rol del usuario:', user.role);

    return hasRole;
  }
} 