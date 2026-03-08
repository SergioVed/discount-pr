import { DomainError } from "src/core/errors/base/DomainError";

export class InvalidSpecialOfferDateRangeError extends DomainError {
    constructor (activeTo: Date, activeFrom: Date) {
        super("activeTo cannot be earlier than activeFrom", {activeTo, activeFrom})
    }
}