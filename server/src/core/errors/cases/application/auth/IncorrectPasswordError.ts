import { ApplicationError } from "../../../base/ApplicationError";

export class IncorrectPasswordError extends ApplicationError {
    constructor () {
        super (`Password is incorrect`)
    }
}