import { Inject, Injectable } from "@nestjs/common";
import { CreateSignInInviteDto } from "src/core/repository/SignInInviteRepository/dto/CreateSignInInviteDto";
import type { ISignInInviteRepository } from "src/core/repository/SignInInviteRepository/SignInInviteRepository";
import uuid from 'uuid'

@Injectable()
export class SignInInviteService {

    constructor(
        @Inject('ISignInInviteRepository') private signInInviteRepository: ISignInInviteRepository
    ){}

    async createInvite (dto: CreateSignInInviteDto) {
        const token = uuid.v4()
        const invite = await this.signInInviteRepository.createInvite({...dto, token: token, expiresAt: new Date(Date.now() + 60*60*1000)})
        return invite
    } 

    async getAllInvites () {
        const invites = await this.signInInviteRepository.getAllInvites()
        return invites
    }

    async getInviteByToken (token: string) {
        const invite = await this.signInInviteRepository.getInviteByToken(token)
        return invite
    }
}