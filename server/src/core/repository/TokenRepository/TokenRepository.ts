import { Token } from "src/core/entities/Token/Token";
import { CreateTokenDto } from "./dto/CreateTokenDto";


export interface ITokenRepository {
    saveToken(dto: CreateTokenDto): Promise<Token>
    getOne(userId: number): Promise<Token | null>
    updateToken(tokenId: number, token: string): Promise<Token | null>
}