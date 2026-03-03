import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { CreateUserDtoClient } from "src/core/repository/UserRepository/dto/CreateUserDto";
import { AuthService } from "src/core/services/AuthService/AuthService";


@Controller('auth')
export class AuthController {

    constructor (
        private authService: AuthService
    ) {}

    @Post('login')
    async login (@Body() body: {email: string, password: string}) {
        return await this.authService.login(body.email, body.password)
    }

    @Post('register/:token')
    async register (
        @Body() dto: CreateUserDtoClient,
        @Param('token') token: string
    ) {
        return await this.authService.register(dto, token)
    }
}