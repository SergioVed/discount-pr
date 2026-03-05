import { User } from 'src/core/entities/User/User';

export class Payload {
  private _userId: number;
  private _role: string;
  private _isActive: boolean;

  constructor(domainModel: User) {
    ((this._role = domainModel.role), (this._userId = domainModel.userId));
    this._isActive = domainModel.isActive;
  }
}
