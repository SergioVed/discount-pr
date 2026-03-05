import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from 'src/core/services/TokenService/TokenService';
import { extractToken } from 'src/helpers/token/extractToken';

@Injectable()
export class IsActivated implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user._isActive) {
      throw new ForbiddenException('User is not activated');
    }

    return true;
  }
}
