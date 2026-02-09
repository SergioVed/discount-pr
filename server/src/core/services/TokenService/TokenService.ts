import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { ITokenRepository } from "src/core/repository/TokenRepository/TokenRepository";
import { Payload } from "./payload/payload";
import { CreateTokenDto } from "src/core/repository/TokenRepository/dto/CreateTokenDto";

@Injectable()
export class TokenService {

    constructor (
        @Inject('ITokenRepository') private tokenRepository: ITokenRepository,
        private jwtService: JwtService
    ) {}

    generateTokens (payload: Payload) {
        const accessToken = this.jwtService.sign({...payload}, {
            secret: process.env.ACCESS_SECRET,
            expiresIn: '30m'
        })

        const refreshToken = this.jwtService.sign({...payload}, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '15d'
        })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken (dto: CreateTokenDto) {
        const token = await this.tokenRepository.getOne(dto.userId)
        if (token) {
            return await this.tokenRepository.updateToken(token.tokenId, dto.token)
        }
        return await this.tokenRepository.saveToken(dto)
    }

    validateRefresh (refresh: string) {
        const userData = this.jwtService.verify(refresh, {
            secret: process.env.REFRESH_SECRET
        })
        return userData
    }

}