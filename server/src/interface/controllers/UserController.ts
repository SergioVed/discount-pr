import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from 'src/core/services/UserService/UserService';
import { Roles } from '../decorators/RoleDecorator';
import { RoleGuard } from '../guards/RoleGuard';
import { AuthGuard } from '../guards/AuthGuard';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UserService
    ){}

    @Roles("ADMIN")
    @UseGuards(AuthGuard, RoleGuard)
    @Put('/:id')
    async activateUser (@Param('id') id: number) {
        const user = await this.userService.activateUser(id)
        return user
    }

    @Roles("ADMIN")
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    async getAllUsers () {
        const users = await this.userService.getAllUsers()
        return users
    }
}
