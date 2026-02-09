import { InjectModel } from "@nestjs/sequelize";
import { SignInInvite } from "src/core/entities/SignInInvite/SignInInvite";
import { CreateSignInInviteDto } from "src/core/repository/SignInInviteRepository/dto/CreateSignInInviteDto";
import { ISignInInviteRepository } from "src/core/repository/SignInInviteRepository/SignInInviteRepository";
import { SignInInviteService } from "src/core/services/SignInInviteService/SignInInviteService";
import { SignInInviteModel } from "../entities/SignInInviteModel";
import { SignInInviteMapper } from "../mappers/SignInInviteMapper";


export class SignInInviteRepositoryImpl implements ISignInInviteRepository {

    constructor (
        private signInInviteMapper: SignInInviteMapper,
        @InjectModel(SignInInviteModel) private signInInviteModel: typeof SignInInviteModel
    ) {}
    
    async createInvite(dto: CreateSignInInviteDto): Promise<SignInInvite> {
        const modelData = {
            token: dto.token,
            email_to: dto.emailTo,
            created_by: dto.createdBy,
            expires_at: dto.expiresAt
        }
        const invite = await this.signInInviteModel.create(modelData)
        return this.signInInviteMapper.toDomain(invite)
    }
    async getAllInvites(): Promise<SignInInvite[]> {
        const invites = await this.signInInviteModel.findAll()
        return invites.map(e => this.signInInviteMapper.toDomain(e))
    }
    async getInviteByToken(token: string): Promise<SignInInvite | null> {
        const invite = await this.signInInviteModel.findOne({where: {token}})
        if (!invite) {
            return null
        }
        return this.signInInviteMapper.toDomain(invite)
    }
    
}