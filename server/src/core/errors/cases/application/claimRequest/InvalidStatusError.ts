import { ApplicationError } from 'src/core/errors/base/ApplicationError';

export class InvalidStatusError extends ApplicationError {
  constructor(status: string) {
    super(`Invalid status: ${status}`);
  }
}
