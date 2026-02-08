import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/core/repository/UserRepository/dto/CreateUserDto';
import { UserService } from 'src/core/services/UserService/UserService';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UserService
    ){}

    @Post()
    async createUser (@Body() dto: CreateUserDto) {
        const user = await this.userService.createUser(dto)
        return user
    }

    @Get()
    async getAllUsers () {
        const users = await this.userService.getAllUsers()
        return users
    }
}
