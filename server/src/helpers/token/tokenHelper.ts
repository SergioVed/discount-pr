import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createHash } from "crypto";
import { Transaction } from "sequelize";
import { User } from "src/core/entities/User/User";
import { CreateTokenPersistenceDto } from "src/core/repository/TokenRepository/dto/CreateTokenPersistenceDto";
import { Payload } from "src/core/services/TokenService/payload";
import { TokenService } from "src/core/services/TokenService/TokenService";

@Injectable()
export class TokenHelper {

    constructor(
        private tokenService: TokenService
    ) { }

    async saveToken(user: User, tx?: Transaction) {
        const payload = new Payload(user);
        const tokens = this.tokenService.generateTokens(payload);
        const refreshHash = createHash('sha256').update(tokens.refreshToken).digest('hex')
        const modelData: CreateTokenPersistenceDto = {
            token: refreshHash,
            userId: user.userId,
        };
        await this.tokenService.saveToken(modelData, tx);

        return tokens
    }

    extractToken(request: any) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Missing headers');
        }

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Missing bearer or token');
        }

        request.user = this.tokenService.validateAccess(token);
    }
}


