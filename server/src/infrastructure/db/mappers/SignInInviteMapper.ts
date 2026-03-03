import { Token } from "src/core/entities/Token/Token"
import { Injectable } from "@nestjs/common"
import { SignInInviteModel } from "../entities/SignInInviteModel"
import { SignInInvite } from "src/core/entities/SignInInvite/SignInInvite"
import { CreateInvireDtoRepository } from "src/core/repository/SignInInviteRepository/dto/CreateInviteDtoRepository"

@Injectable()
export class SignInInviteMapper {
    toDomain(entity: SignInInviteModel): SignInInvite {
        return new SignInInvite (
            entity.usedAt,
            entity.invite_id,
            entity.token,
            entity.email_to,
            entity.created_by,
            entity.expires_at
        )
    }
    toPersistance(entity: SignInInvite) {
        return {
            invite_id: entity.inviteId,
            token: entity.token,
            email_to: entity.emailTo,
            created_by: entity.createdBy,
            usedAt: entity.usedAt,
            expires_at: entity.expiresAt
        }
    }
    toCreationPersistance(dto: CreateInvireDtoRepository) {
        return {
            token: dto.token,
            email_to: dto.emailTo,
            created_by: dto.createdBy,
            expires_at: dto.expiresAt
        }
    }

}