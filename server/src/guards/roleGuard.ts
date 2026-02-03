import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { role_key } from "src/decorators/roleDecorator";
import express from "express"
import { TokensService } from "src/tokens/tokens.service";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private tokenService: TokensService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles: string[] = this.reflector.getAllAndOverride(role_key, [
            context.getClass(),
            context.getHandler()
        ])

        console.log(requiredRoles)
        if (!requiredRoles) {
            return true
        }

        const req: express.Request & {user: {user_id: number, role: string}} = context.switchToHttp().getRequest()
        const userData = this.tokenService.verifyToken(req)
        req.user = userData     

        return requiredRoles.some(role => userData.role === role)
    }
    
}