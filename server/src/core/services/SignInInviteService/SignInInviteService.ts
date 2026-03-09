import { Inject, Injectable } from '@nestjs/common';
import { SignInInvite } from 'src/core/entities/SignInInvite/SignInInvite';
import { CreateInvitePersistenceDto } from 'src/core/repository/SignInInviteRepository/dto/CreateInvitePersistenceDto';
import type { ISignInInviteRepository } from 'src/core/repository/SignInInviteRepository/SignInInviteRepository';
import uuid from 'uuid';
import { CreateInviteInput } from './types';
import { Transaction } from 'sequelize';
import { EntityNotFoundError } from 'src/core/errors/cases/application/shared/EntityNotFoundError';
import { InviteExpiredError } from 'src/core/errors/cases/application/signInInvite/InviteExpiredError';
import { InviteNotFoundError } from 'src/core/errors/cases/application/signInInvite/InviteNotFoundError';
import { InviteUsedError } from 'src/core/errors/cases/application/signInInvite/InviteUsedError';

@Injectable()
export class SignInInviteService {
  constructor(
    @Inject('ISignInInviteRepository')
    private signInInviteRepository: ISignInInviteRepository,
  ) {}

  async createInvite(dto: CreateInviteInput) {
    const token = uuid.v4();
    const modelData: CreateInvitePersistenceDto = {
      emailTo: dto.emailTo,
      createdBy: dto.createdBy,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      token: token,
    };
    const invite = await this.signInInviteRepository.create(modelData);
    return invite;
  }

  async getAllInvites() {
    const invites = await this.signInInviteRepository.getAll();
    return invites;
  }

  async consumeOrThrowInvite(token: string, tx: Transaction, email: string) {
    const invite = await this.signInInviteRepository.getInviteByToken(token, tx)
    if (!invite) throw new EntityNotFoundError("Invite")
    if (invite.expiresAt < new Date()) throw new InviteExpiredError
    if (invite.emailTo.toLowerCase() !== email.toLowerCase()) throw new InviteNotFoundError(token, {email: email, message: "Email in invite not equals to email in dto"})
    if (invite.usedAt) throw new InviteUsedError(invite.usedAt)
    
    invite.markAsUsed()
    const updated = await this.signInInviteRepository.update(invite, tx);
    if (!updated) throw new InviteNotFoundError(token) 
    return updated
  }
}
