import { RoleInvalidError } from 'src/core/errors/cases/domain/user/RoleInvalidError';
import { UserAlreadyActivatedError } from 'src/core/errors/cases/domain/user/UserAlreadyActivatedError';

export class User {
  constructor(
    private _userId: number,
    private _firstName: string,
    private _lastName: string,
    private _role: 'ADMIN' | 'MANAGER',
    private _email: string,
    private _password: string,
    private _isActive: boolean,
  ) {}

  get userId(): number {
    return this._userId;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get role(): 'ADMIN' | 'MANAGER' {
    return this._role;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  activate() {
    if (this._isActive == true) {
      throw new UserAlreadyActivatedError(this._userId);
    }
    this._isActive = true;
  }
}
