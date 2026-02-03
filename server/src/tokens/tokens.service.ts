import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { CreateTokenDto } from './dto/token.dto';
import { PayloadDto } from 'src/auth/payload/payload.dto';
import { User } from 'src/users/user.model';
import express from "express"

@Injectable()
export class TokensService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(Token) private tokenModel: typeof Token
    ) { }

    generateTokens(payload: PayloadDto) {

        const access_token = this.jwtService.sign({ ...payload }, {
            secret: process.env.ACCESS_SECRET,
            expiresIn: '30m'
        })

        const refresh_token = this.jwtService.sign({ ...payload }, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '15d'
        })

        return {
            access_token,
            refresh_token
        }
    }

    async saveToken(dto: CreateTokenDto) {
        const { user_id, token } = dto

        const tokenData = await this.tokenModel.findOne({
            where: { user_id }
        })
        if (tokenData) {
            tokenData.token = token
            await tokenData.save()

            return tokenData
        }

        const refresh_token = await this.tokenModel.create(dto)
        return refresh_token
    }

    async validateRefresh(refresh_token: string) {
        const userData = await this.jwtService.verify(refresh_token, {
            secret: process.env.REFRESH_SECRET
        })
        return userData
    }

    async CreateAndSaveTokens(user: User) {
        const payload = new PayloadDto(user)

        const tokens = this.generateTokens(payload)
        await this.saveToken({ user_id: user.user_id, token: tokens.refresh_token })

        return tokens
    }

    verifyToken(req: express.Request) {

        const headers = req.headers.authorization
        if (!headers) {
            throw new UnauthorizedException("No token, sosi")
        }
        const bearer = headers.split(" ")[0]
        const token = headers.split(" ")[1]
        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("No token, sosi")
        }

        const userData = this.jwtService.verify(token, { secret: process.env.ACCESS_SECRET })
        if (!userData) {
            throw new UnauthorizedException("No token, sosi")
        }
        return userData
    }

}
