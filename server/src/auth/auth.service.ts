import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { TokensService } from 'src/tokens/tokens.service';
import { SignInInvitesService } from 'src/sign-in-invites/sign-in-invites.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private tokenService: TokensService,
        private inviteService: SignInInvitesService
    ){}

    async register (dto: CreateUserDto & {token: string}) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new BadRequestException("User already exists")
        }
        const hashPassword = bcrypt.hashSync(dto.password, 5)
        const user = await this.userService.createUser({...dto, password: hashPassword})

        await this.inviteService.markAsUsed(dto.token)

        const tokens = await this.tokenService.CreateAndSaveTokens(user)

        return {
            user,
            tokens
        }
    }

    async login (dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (!candidate) {
            throw new BadRequestException('no user with this email')
        }
        const comparePassword = bcrypt.compare(dto.password, candidate.password)
        if (!comparePassword) {
            throw new BadRequestException('incorrect password')
        }
        const tokens = await this.tokenService.CreateAndSaveTokens(candidate)

        return {
            candidate,
            tokens
        }
    }

    async refresh (refresh_token: string) {
        if (!refresh_token) {
            throw new BadRequestException('invalid data')
        }
        const userData = await this.tokenService.validateRefresh(refresh_token)
        if (!userData) {
            throw new BadRequestException('invalid refresh_token')
        }
        const user = await this.userService.getUserById(userData.payload.user_id)
        if (!user) {
            throw new BadRequestException('invalid user')
        }
        const tokens = await this.tokenService.CreateAndSaveTokens(user)

        return {
            user,
            tokens
        }
    }

}
