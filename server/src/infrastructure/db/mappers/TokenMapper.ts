import { Token } from "src/core/entities/Token/Token"
import { TokenModel } from "../entities/TokenModel"
import { Injectable } from "@nestjs/common"

interface Mapper <T, E> {
    toDomain(entity: T): E
    toModel(entity: E): any
}

@Injectable()
export class TokenMapper implements Mapper<TokenModel, Token> {
    toDomain(entity: TokenModel): Token {
        return new Token (
            entity.token_id,
            entity.token,
            entity.user_id
        )
    }
    toModel(entity: Token) {
        return {
            token_id: entity.tokenId,
            token: entity.token,
            user_id: entity.userId
        }
    }

}