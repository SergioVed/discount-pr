import { Token } from 'src/core/entities/Token/Token';
import { TokenModel } from '../entities/TokenModel';
import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from 'src/core/repository/TokenRepository/dto/CreateTokenDto';

@Injectable()
export class TokenMapper {
  toDomain(entity: TokenModel): Token {
    return new Token(entity.token_id, entity.token, entity.user_id);
  }
  toPersistance(entity: Token) {
    return {
      token_id: entity.tokenId,
      token: entity.token,
      user_id: entity.userId,
    };
  }
  toCreationPersistance(dto: CreateTokenDto) {
    return {
      token: dto.token,
      user_id: dto.userId,
    };
  }
}
