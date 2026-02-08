import { InjectModel } from "@nestjs/sequelize";
import { Token } from "src/core/entities/Token/Token";
import { CreateTokenDto } from "src/core/repository/TokenRepository/dto/CreateTokenDto";
import { ITokenRepository } from "src/core/repository/TokenRepository/TokenRepository";
import { TokenModel } from "../entities/TokenModel";
import { TokenMapper } from "../mappers/TokenMapper";


export class TokenRepositoryImpl implements ITokenRepository {

    constructor (
        @InjectModel(TokenModel) private tokenModel: typeof TokenModel,
        private tokenMapper: TokenMapper
    ) {}

    async saveToken(dto: CreateTokenDto): Promise<Token> {
        const modelData = {
            token: dto.token,
            user_id: dto.userId
        }
        const token = await this.tokenModel.create(modelData)
        return this.tokenMapper.toDomain(token)
    }
    async getOne(userId: number): Promise<Token | null> {
        const token = await this.tokenModel.findOne({where: {user_id: userId}})
        if (!token) {
            return null
        }
        return this.tokenMapper.toDomain(token)
    }
    async updateToken(tokenId: number, token: string): Promise<Token | null> {
        const refresh_token = await this.tokenModel.findByPk(tokenId)
        if (refresh_token) {
            refresh_token.token = token
            await refresh_token.save()
        } else if (!refresh_token) {
            return null
        }
        return this.tokenMapper.toDomain(refresh_token)
    }
    
}