import { ApplicationError } from '../../../base/ApplicationError';

export class EntityNotFoundError extends ApplicationError {
  constructor(entityName: string, id?: number) {
    super(`${entityName} with id ${id ?? "***"} does not exist`);
  }
}
