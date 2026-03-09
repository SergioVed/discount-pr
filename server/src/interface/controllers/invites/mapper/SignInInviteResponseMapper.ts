import { SignInInvite } from 'src/core/entities/SignInInvite/SignInInvite';

export class SignInInviteResponseMapper {
  static toResponse(invite: SignInInvite) {
    return {
      inviteId: invite.inviteId,
      token: invite.token,
      emailTo: invite.emailTo,
      createdBy: invite.createdBy,
      expiresAt: invite.expiresAt,
      usedAt: invite.usedAt,
    };
  }
}
