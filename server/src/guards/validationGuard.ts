import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { TokensService } from "src/tokens/tokens.service";


@Injectable()
export class ValidationGuard implements CanActivate {

    constructor(
        private tokenService: TokensService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        req.user = this.tokenService.verifyToken(req)
        return true
    }

}