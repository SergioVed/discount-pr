import { ApplicationError } from "../../../base/ApplicationError";

export class UndefinedEmailError extends ApplicationError {
    constructor (email: string) {
        super (`User with email: ${email} does not exist`)
    }
}