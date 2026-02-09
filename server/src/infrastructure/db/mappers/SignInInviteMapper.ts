import { Token } from "src/core/entities/Token/Token"
import { Injectable } from "@nestjs/common"
import { SignInInviteModel } from "../entities/SignInInviteModel"
import { SignInInvite } from "src/core/entities/SignInInvite/SignInInvite"

interface Mapper <T, E> {
    toDomain(entity: T): E
    toModel(entity: E): any
}

@Injectable()
export class SignInInviteMapper implements Mapper<SignInInviteModel, SignInInvite> {
    toDomain(entity: SignInInviteModel): SignInInvite {
        return new SignInInvite (
            entity.invite_id,
            entity.token,
            entity.email_to,
            entity.created_by,
            entity.usedAt,
            entity.expires_at
        )
    }
    toModel(entity: SignInInvite) {
        return {
            invite_id: entity.inviteId,
            token: entity.token,
            email_to: entity.emailTo,
            created_by: entity.createdBy,
            usedAt: entity.usedAt,
            expires_at: entity.expiresAt
        }
    }

}