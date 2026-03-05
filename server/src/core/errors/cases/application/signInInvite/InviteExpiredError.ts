import { ApplicationError } from '../../../base/ApplicationError';

export class InviteExpiredError extends ApplicationError {
  constructor() {
    super(`This invite is expired`);
  }
}
