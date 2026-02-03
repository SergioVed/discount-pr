import { Body, Controller, Param, Post, Query, Request, Response } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import express from "express"
import { InviteLinkPipe } from 'src/pipes/invitePipe';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async register (
        @Body() dto: CreateUserDto, 
        @Response({passthrough: true}) res: express.Response,
        @Query('token', InviteLinkPipe) token: string,
    ) {
        const user = await this.authService.register({...dto, token})
        const refresh_token = user.tokens.refresh_token

        this.saveCookies(res, refresh_token)
        return user
    }

    @Post('login')
    async login (@Body() dto: CreateUserDto, @Response({passthrough: true}) res: express.Response) {
        const user = await this.authService.login(dto)
        const refresh_token = user.tokens.refresh_token

        this.saveCookies(res, refresh_token)
        return user
    }

    @Post('refresh')
    async refresh (@Request() req: express.Request, @Response({passthrough: true}) res: express.Response) {
        const {refresh_token} = req.cookies
        const user = await this.authService.refresh(refresh_token)
        const new_refresh_token = user.tokens.refresh_token
        
        this.saveCookies(res, new_refresh_token)
        return user
    }

    saveCookies (res: express.Response, refresh_token: string) {
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true
        })
    }

}
