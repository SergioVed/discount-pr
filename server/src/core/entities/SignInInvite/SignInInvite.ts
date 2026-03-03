import { EntityAlreadyExistsError } from "src/core/errors/cases/domain/shared/EntityAlreadyExistsError"

export class SignInInvite {
    constructor (
        private _usedAt: Date,
        private _inviteId: number,
        private _token: string,
        private _emailTo: string,
        private _createdBy: number,
        private _expiresAt: Date
    ) {}
    get inviteId () {
        return this._inviteId
    }
    get usedAt () {
        return this._usedAt
    }
    get token () {
        return this._token
    }
    get emailTo () {
        return this._emailTo
    }
    get createdBy () {
        return this._createdBy
    }
    get expiresAt () {
        return this._expiresAt
    }

    markAsUsed () {
        if (!this._usedAt) {
            this._usedAt = new Date()
        } else {
            throw new EntityAlreadyExistsError("SignInInvite", this._inviteId)
        }
    }

}