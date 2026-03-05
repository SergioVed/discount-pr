import { ApplicationError } from 'src/core/errors/base/ApplicationError';

export class InviteUsedError extends ApplicationError {
  constructor(usedAt: Date) {
    super(`Invite was already used at ${usedAt}`);
  }
}
