import { ApplicationError } from "src/core/errors/base/ApplicationError";

export class InvalidManagerId extends ApplicationError {
    constructor (managerId: number) {
        super("You are not allowed to edit this restaurant", {managerId})
    }
}