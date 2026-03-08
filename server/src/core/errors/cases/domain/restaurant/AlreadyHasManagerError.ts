import { DomainError } from "src/core/errors/base/DomainError";


export class AlreadyHasManagerError extends DomainError {
    constructor (restaurantId: number) {
        super(`Restaurant with id ${restaurantId} already has manager`, {restaurantId})
    }
}