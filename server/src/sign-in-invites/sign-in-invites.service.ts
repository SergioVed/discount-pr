import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignIn_invite } from './sing-in-invite.model';
import { SignInInviteDto } from './dto/sign-in-invite.dto';
import uuid from "uuid"

@Injectable()
export class SignInInvitesService {

    constructor(@InjectModel(SignIn_invite) private inviteModel: typeof SignIn_invite){}

    async createInvite (dto: SignInInviteDto) {
        const token = uuid.v4()
        const expires_at = new Date(Date.now() + 60 * 60 * 1000)

        const invite = await this.inviteModel.create({...dto, token: token, expires_at: expires_at})
        const link = `${process.env.FRONTEND_URL}/sign-in?token=${token}`

        return {
            link,
            invite
        }
    }

    async getAllInvites () {
        const invites = await this.inviteModel.findAll({include: {all: true}})
        return invites
    }

    async getInviteByToken (token: string) {
        if (!token) {
            throw new BadRequestException("no invite token")
        }
        const invite = await this.inviteModel.findOne({where: {token}})
        return invite
    }

    async markAsUsed (token: string) {
        const invite = await this.getInviteByToken(token)
        if (!invite) {
            throw new BadRequestException('Sosi, no token')
        }
        invite.usedAt = new Date()
        await invite.save()

        return invite
    }
}
