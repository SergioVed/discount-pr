import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
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
