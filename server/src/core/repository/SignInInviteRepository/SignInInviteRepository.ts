import { SignInInvite } from "src/core/entities/SignInInvite/SignInInvite";
import { CreateSignInInviteDto } from "./dto/CreateSignInInviteDto";


export interface ISignInInviteRepository {
    createInvite(dto: CreateSignInInviteDto): Promise<SignInInvite>
    getAllInvites(): Promise<SignInInvite[]>
    getInviteByToken(token: string): Promise<SignInInvite | null>
}