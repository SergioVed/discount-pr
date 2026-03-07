import { Token } from 'src/core/entities/Token/Token';
import { CreateTokenPersistenceDto } from './dto/CreateTokenPersistenceDto';
import { Transaction } from 'sequelize';

export interface ITokenRepository {
  create(dto: CreateTokenPersistenceDto, tx?: Transaction): Promise<Token>;
  getOne(userId: number, tx?: Transaction): Promise<Token | null>;
  update(tokenId: number, token: string, tx?: Transaction): Promise<Token | null>;
}
