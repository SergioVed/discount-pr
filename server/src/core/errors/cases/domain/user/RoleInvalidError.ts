import { DomainError } from "src/core/errors/base/DomainError";


export class RoleInvalidError extends DomainError {
    constructor (role: string) {
        super (`Role ${role.toLowerCase} is invalid`)
    }
}