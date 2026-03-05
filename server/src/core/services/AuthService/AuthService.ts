import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../UserService/UserService';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../TokenService/TokenService';
import { Payload } from '../TokenService/payload/payload';
import { CreateTokenDto } from 'src/core/repository/TokenRepository/dto/CreateTokenDto';
import { CreateUserPersistenceDto } from 'src/core/repository/UserRepository/dto/CreateUserPersistenceDto';
import { SignInInviteService } from '../SignInInviteService/SignInInviteService';
import { EntityAlreadyExistsError } from 'src/core/errors/cases/domain/shared/EntityAlreadyExistsError';
import { IncorrectPasswordError } from 'src/core/errors/cases/application/auth/IncorrectPasswordError';
import { UndefinedEmailError } from 'src/core/errors/cases/application/auth/UndefinedEmailError';
import { InviteValidator } from 'src/helpers/signInInvite/validateInvite';
import { LoginUserInput, RegisterUserInput } from './types';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private signInInviteService: SignInInviteService,
        private inviteValidator: InviteValidator,
    ) { }

    async login(dto: LoginUserInput) {
        const candidate = await this.userService.findUserByEmail(dto.email);
        if (!candidate) {
            throw new UndefinedEmailError(dto.email);
        }
        const comparePassword = await bcrypt.compare(
            dto.password,
            candidate.password,
        );
        if (!comparePassword) {
            throw new IncorrectPasswordError();
        }

        const payload = new Payload(candidate);
        const tokens = this.tokenService.generateTokens(payload);
        const modelData: CreateTokenDto = {
            token: tokens.refreshToken,
            userId: candidate.userId,
        };
        await this.tokenService.saveToken(modelData);

        return {
            candidate,
            tokens,
        };
    }

    async register(dto: RegisterUserInput, signInToken: string) {
        const invite = await this.inviteValidator.validateInvite(signInToken);

        const candidate = await this.userService.findUserByEmail(dto.email);
        if (candidate) {
            throw new EntityAlreadyExistsError('User', candidate.userId);
        }

        const password = await bcrypt.hash(dto.password, 5);

        const createUserPersistenceDto: CreateUserPersistenceDto = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: password,
            role: 'MANAGER',
        };

        const user = await this.userService.createUser(createUserPersistenceDto);
        if (user) {
            await this.signInInviteService.markAsUsed(invite);
        }

        const payload = new Payload(user);
        const tokens = this.tokenService.generateTokens(payload);
        const modelData: CreateTokenDto = {
            token: tokens.refreshToken,
            userId: user.userId,
        };
        await this.tokenService.saveToken(modelData);

        return {
            user,
            tokens,
        };
    }
}
