import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInInviteDto } from './dto/sign-in-invite.dto';
import { SignInInvitesService } from './sign-in-invites.service';

@Controller('invites')
export class SignInInvitesController {

    constructor(private inviteService: SignInInvitesService){}

    @Post()
    async createInvite (@Body() dto: SignInInviteDto) {
        return await this.inviteService.createInvite(dto)
    }

    @Get()
    async getAllInvites () {
        return await this.inviteService.getAllInvites()
    }
}
