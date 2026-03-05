import { ApplicationError } from '../../../base/ApplicationError';

export class SyncFromGoogleError extends ApplicationError {
  constructor(lastSynced: Date) {
    super('Syncing restaurant is available after 1 week from previous sync', {
      lastSynced,
    });
  }
}
