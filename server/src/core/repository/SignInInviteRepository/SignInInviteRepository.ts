import { SignInInvite } from 'src/core/entities/SignInInvite/SignInInvite';
import { CreateInvitePersistenceDto } from './dto/CreateInvitePersistenceDto';
import { Transaction } from 'sequelize';

export interface ISignInInviteRepository {
  create(dto: CreateInvitePersistenceDto): Promise<SignInInvite>;
  getAll(): Promise<SignInInvite[]>;
  getInviteByToken(token: string, tx: Transaction): Promise<SignInInvite | null>;
  update(invite: SignInInvite, tx: Transaction): Promise<SignInInvite | null>;
}
