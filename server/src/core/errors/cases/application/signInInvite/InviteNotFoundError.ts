import { ApplicationError } from '../../../base/ApplicationError';

export class InviteNotFoundError extends ApplicationError {
  constructor(token: string, details?: object) {
    super(`Invite not found`, details ?? {token: token});
  }
}
