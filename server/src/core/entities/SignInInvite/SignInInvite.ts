
export class SignInInvite {
    constructor (
        readonly inviteId: number,
        readonly token: string,
        readonly emailTo: string,
        readonly createdBy: number,
        readonly usedAt: Date,
        readonly expiresAt: Date
    ) {}

}