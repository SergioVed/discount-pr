import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SignInInvite } from "src/core/entities/SignInInvite/SignInInvite";
import { InviteExpiredError } from "src/core/errors/cases/application/signInInvite/InviteExpiredError";
import { InviteNotFoundError } from "src/core/errors/cases/application/signInInvite/InviteNotFoundError";
import { InviteUsedError } from "src/core/errors/cases/application/signInInvite/InviteUsedError";
import { CreateInviteClientDto } from "src/core/repository/SignInInviteRepository/dto/CreateInviteClientDto";
import { CreateInvireDtoRepository } from "src/core/repository/SignInInviteRepository/dto/CreateInviteDtoRepository";
import type { ISignInInviteRepository } from "src/core/repository/SignInInviteRepository/SignInInviteRepository";
import uuid from 'uuid'

@Injectable()
export class SignInInviteService {

    constructor(
        @Inject('ISignInInviteRepository') private signInInviteRepository: ISignInInviteRepository
    ){}

    async createInvite (dto: CreateInviteClientDto) {
        const token = uuid.v4()
        const modelData: CreateInvireDtoRepository = {
            emailTo: dto.emailTo,
            createdBy: dto.createdBy, 
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            token: token,
        }
        const invite = await this.signInInviteRepository.create(modelData)
        return invite
    } 

    async getAllInvites () {
        const invites = await this.signInInviteRepository.getAll()
        return invites
    }

    async markAsUsed (invite: SignInInvite) {
        invite.markAsUsed()
        const newInvite = await this.signInInviteRepository.update(invite)
        return newInvite
    }
}