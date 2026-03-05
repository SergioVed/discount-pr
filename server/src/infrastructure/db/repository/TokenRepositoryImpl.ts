import { InjectModel } from '@nestjs/sequelize';
import { Token } from 'src/core/entities/Token/Token';
import { CreateTokenDto } from 'src/core/repository/TokenRepository/dto/CreateTokenDto';
import { ITokenRepository } from 'src/core/repository/TokenRepository/TokenRepository';
import { TokenModel } from '../entities/TokenModel';
import { TokenMapper } from '../mappers/TokenMapper';

export class TokenRepositoryImpl implements ITokenRepository {
  constructor(
    @InjectModel(TokenModel) private tokenModel: typeof TokenModel,
    private tokenMapper: TokenMapper,
  ) {}

  async create(dto: CreateTokenDto): Promise<Token> {
    const persistance = this.tokenMapper.toCreationPersistance(dto);
    const token = await this.tokenModel.create(persistance);
    return this.tokenMapper.toDomain(token);
  }

  async getOne(userId: number): Promise<Token | null> {
    const token = await this.tokenModel.findOne({ where: { user_id: userId } });
    if (!token) {
      return null;
    }
    return this.tokenMapper.toDomain(token);
  }

  async update(tokenId: number, token: string): Promise<Token | null> {
    const refresh_token = await this.tokenModel.findByPk(tokenId);
    if (refresh_token) {
      refresh_token.token = token;
      await refresh_token.save();
    } else if (!refresh_token) {
      return null;
    }
    return this.tokenMapper.toDomain(refresh_token);
  }
}
