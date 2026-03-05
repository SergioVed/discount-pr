import { SignInInvite } from 'src/core/entities/SignInInvite/SignInInvite';
import { CreateInvireDtoRepository } from './dto/CreateInviteDtoRepository';

export interface ISignInInviteRepository {
  create(dto: CreateInvireDtoRepository): Promise<SignInInvite>;
  getAll(): Promise<SignInInvite[]>;
  getInviteByToken(token: string): Promise<SignInInvite | null>;
  update(invite: SignInInvite): Promise<SignInInvite | null>;
}
