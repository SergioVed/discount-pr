import { DomainError } from "src/core/errors/base/DomainError";


export class UserAlreadyActivatedError extends DomainError {
    constructor (userId: number) {
        super ("User is already activated", userId)
    }
}