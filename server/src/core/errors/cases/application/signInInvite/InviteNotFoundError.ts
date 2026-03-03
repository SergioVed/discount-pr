import { ApplicationError } from "../../../base/ApplicationError";

export class InviteNotFoundError extends ApplicationError {
    constructor (token: string) {
        super (`Invite not found`, {inviteToken: token})
    }
}