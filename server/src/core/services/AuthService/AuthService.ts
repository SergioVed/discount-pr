import { Injectable } from '@nestjs/common';
import { UserService } from '../UserService/UserService';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../TokenService/TokenService';
import { Payload } from '../TokenService/payload';
import { CreateTokenPersistenceDto } from 'src/core/repository/TokenRepository/dto/CreateTokenPersistenceDto';
import { CreateUserPersistenceDto } from 'src/core/repository/UserRepository/dto/CreateUserPersistenceDto';
import { SignInInviteService } from '../SignInInviteService/SignInInviteService';
import { EntityAlreadyExistsError } from 'src/core/errors/cases/domain/shared/EntityAlreadyExistsError';
import { IncorrectPasswordError } from 'src/core/errors/cases/application/auth/IncorrectPasswordError';
import { UndefinedEmailError } from 'src/core/errors/cases/application/auth/UndefinedEmailError';
import { LoginUserInput, RegisterUserInput } from './types';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { TokenHelper } from 'src/helpers/token/tokenHelper';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private signInInviteService: SignInInviteService,
        private sequelize: Sequelize,
        private tokenHelper: TokenHelper
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

        const tokens = await this.tokenHelper.saveToken(candidate)

        return {
            candidate,
            tokens,
        };
    }

    async register(dto: RegisterUserInput, token: string) {
        const password = await bcrypt.hash(dto.password, 5);
    
        return await this.sequelize.transaction(async (tx: Transaction) => {

            const invite = await this.signInInviteService.consumeOrThrowInvite(token, tx, dto.email)

            const candidate = await this.userService.findUserByEmail(dto.email, tx);
            if (candidate) {
                throw new EntityAlreadyExistsError('User', candidate.userId);
            }

            const createUserPersistenceDto: CreateUserPersistenceDto = {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                password: password,
                role: 'MANAGER',
            };

            const user = await this.userService.createUser(createUserPersistenceDto, tx)

            const tokens = await this.tokenHelper.saveToken(user, tx)

            return {
                user,
                tokens,
            };
        })
    }
}
