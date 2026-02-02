import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { SignInInvitesService } from "src/sign-in-invites/sign-in-invites.service";


@Injectable()
export class InviteLinkPipe implements PipeTransform<string> {

    constructor(private inviteService: SignInInvitesService){}

    async transform(value: string) {
        const invite = await this.inviteService.getInviteByToken(value)
        if (!invite || invite.expires_at < new Date() || invite.usedAt) {
            throw new BadRequestException('Unusable link')
        }
        return value
    }
}
