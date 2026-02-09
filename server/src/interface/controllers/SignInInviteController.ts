

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/core/repository/RestaurantRepository/dto/CreateRestaurantDto';
import { CreateSignInInviteDto } from 'src/core/repository/SignInInviteRepository/dto/CreateSignInInviteDto';
import { CreateUserDto } from 'src/core/repository/UserRepository/dto/CreateUserDto';
import { RestaurantsService } from 'src/core/services/RestaurantService/RestaurantService';
import { SignInInviteService } from 'src/core/services/SignInInviteService/SignInInviteService';
import { UserService } from 'src/core/services/UserService/UserService';

@Controller('invites')
export class SignInInviteController {

    constructor(
        private signInInviteService: SignInInviteService
    ){}

    @Post()
    async createInvite (@Body() dto: CreateSignInInviteDto) {
        const invite = await this.signInInviteService.createInvite(dto)
        return invite
    }

    @Get()
    async getAllInvites () {
        const invites = await this.signInInviteService.getAllInvites()
        return invites
    }

    @Get('/:token')
    async getInviteByToken (@Param('token') token: string) {
        const invite = await this.signInInviteService.getInviteByToken(token)
        return invite
    }
}
