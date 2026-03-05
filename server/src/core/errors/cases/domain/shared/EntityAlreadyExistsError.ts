import { DomainError } from '../../../base/DomainError';

export class EntityAlreadyExistsError extends DomainError {
  constructor(entityName: string, entityId: number) {
    super(`${entityName} with id ${entityId} already exists`, {
      entityName,
      entityId,
    });
  }
}
