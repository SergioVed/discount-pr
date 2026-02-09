import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "../UserService/UserService";
import * as bcrypt from "bcrypt"
import { TokenService } from "../TokenService/TokenService";
import { Payload } from "../TokenService/payload/payload";
import { CreateTokenDto } from "src/core/repository/TokenRepository/dto/CreateTokenDto";
import { CreateUserDto } from "src/core/repository/UserRepository/dto/CreateUserDto";
import { SignInInviteService } from "../SignInInviteService/SignInInviteService";


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private signInInviteService: SignInInviteService
    ){}

    async login (email: string, password: string) {
        const candidate = await this.userService.findUserByEmail(email)
        if (!candidate) {
            throw new BadRequestException("No user with this email")
        }
        const comparePassword = await bcrypt.compare(password, candidate.password)
        if (!comparePassword) {
            return new BadRequestException("Password is incorrect")
        }
        
        const payload = new Payload(candidate)
        const tokens = this.tokenService.generateTokens(payload)
        const modelData: CreateTokenDto = {token: tokens.refreshToken, userId: candidate.userId}
        await this.tokenService.saveToken(modelData)

        return {
            candidate,
            tokens
        }
    }

    async register (dto: CreateUserDto, signInToken: string) {

        const token = await this.signInInviteService.getInviteByToken(signInToken)
        if (!token) {
            throw new BadRequestException("No registration invite was sent to you")
        }

        const candidate = await this.userService.findUserByEmail(dto.email)
        if (candidate) {
            throw new BadRequestException("User already exists")
        }
        const user = await this.userService.createUser(dto)
        const payload = new Payload(user)
        const tokens = this.tokenService.generateTokens(payload)
        const modelData: CreateTokenDto = {token: tokens.refreshToken, userId: user.userId}
        await this.tokenService.saveToken(modelData)

        return {
            candidate,
            tokens
        }
    }
}