import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    console.log('Auth Header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('No se proporcionó token de autenticación');
    }

    const [type, token] = authHeader.split(' ');
    console.log('Token type:', type);
    console.log('Token:', token);

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Tipo de token inválido');
    }

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('JWT Guard - Error:', err);
    console.log('JWT Guard - User:', user);
    console.log('JWT Guard - Info:', info);

    if (err || !user) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    return user;
  }
} 