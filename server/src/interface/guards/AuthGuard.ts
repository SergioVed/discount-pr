import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenHelper } from 'src/helpers/token/tokenHelper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenHelper: TokenHelper
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.tokenHelper.extractToken(request)
    return true;
  }
}
