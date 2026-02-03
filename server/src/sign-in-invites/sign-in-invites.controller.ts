import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignInInviteDto } from './dto/sign-in-invite.dto';
import { SignInInvitesService } from './sign-in-invites.service';
import { ValidationGuard } from 'src/guards/validationGuard';
import { RoleDecorator } from 'src/decorators/roleDecorator';
import { RoleGuard } from 'src/guards/roleGuard';

@Controller('invites')
export class SignInInvitesController {

    constructor(private inviteService: SignInInvitesService){}

    @RoleDecorator("ADMIN")
    @UseGuards(RoleGuard)
    @Post()
    async createInvite (@Body() dto: SignInInviteDto) {
        return await this.inviteService.createInvite(dto)
    }

    @RoleDecorator("ADMIN")
    @UseGuards(RoleGuard)
    @Get()
    async getAllInvites () {
        return await this.inviteService.getAllInvites()
    }
}
