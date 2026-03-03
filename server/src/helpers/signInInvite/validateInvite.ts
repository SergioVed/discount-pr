import { Inject, Injectable } from "@nestjs/common"
import { InviteExpiredError } from "src/core/errors/cases/application/signInInvite/InviteExpiredError"
import { InviteNotFoundError } from "src/core/errors/cases/application/signInInvite/InviteNotFoundError"
import { InviteUsedError } from "src/core/errors/cases/application/signInInvite/InviteUsedError"
import type { ISignInInviteRepository } from "src/core/repository/SignInInviteRepository/SignInInviteRepository"

@Injectable()
export class InviteValidator {

    constructor (
        @Inject("ISignInInviteRepository") private signInviteRepository: ISignInInviteRepository
    ) {}

    async validateInvite (token: string) {
        const invite = await this.signInviteRepository.getInviteByToken(token)
        if (!invite) {
            throw new InviteNotFoundError(token)
        }
        if (invite.expiresAt < new Date()) {
            throw new InviteExpiredError()
        }
        if (invite.usedAt) {
            throw new InviteUsedError(invite.usedAt)
        }
        return invite
    }

}