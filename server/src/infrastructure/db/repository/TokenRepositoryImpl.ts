import { InjectModel } from '@nestjs/sequelize';
import { Token } from 'src/core/entities/Token/Token';
import { CreateTokenPersistenceDto } from 'src/core/repository/TokenRepository/dto/CreateTokenPersistenceDto';
import { ITokenRepository } from 'src/core/repository/TokenRepository/TokenRepository';
import { TokenModel } from '../entities/TokenModel';
import { TokenMapper } from '../mappers/TokenMapper';
import { Transaction } from 'sequelize';

export class TokenRepositoryImpl implements ITokenRepository {
  constructor(
    @InjectModel(TokenModel) private tokenModel: typeof TokenModel,
    private tokenMapper: TokenMapper,
  ) {}

  async create(dto: CreateTokenPersistenceDto, tx?: Transaction): Promise<Token> {
    const persistance = this.tokenMapper.toCreationPersistance(dto);
    const token = await this.tokenModel.create(persistance, {transaction: tx});
    return this.tokenMapper.toDomain(token);
  }

  async getOne(userId: number, tx?: Transaction): Promise<Token | null> {
    const token = await this.tokenModel.findOne({ where: { user_id: userId }, transaction: tx });
    if (!token) {
      return null;
    }
    return this.tokenMapper.toDomain(token);
  }

  async update(tokenId: number, token: string, tx?: Transaction): Promise<Token | null> {
    const refresh_token = await this.tokenModel.findOne({where: {token_id: tokenId}, transaction: tx});
    if (refresh_token) {
      refresh_token.token = token;
      await refresh_token.save();
    } else if (!refresh_token) {
      return null;
    }
    return this.tokenMapper.toDomain(refresh_token);
  }
}
