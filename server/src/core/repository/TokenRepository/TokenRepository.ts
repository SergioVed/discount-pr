import { Token } from 'src/core/entities/Token/Token';
import { CreateTokenDto } from './dto/CreateTokenDto';

export interface ITokenRepository {
  create(dto: CreateTokenDto): Promise<Token>;
  getOne(userId: number): Promise<Token | null>;
  update(tokenId: number, token: string): Promise<Token | null>;
}
