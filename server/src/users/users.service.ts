import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { SignIn_invite } from 'src/sign-in-invites/sing-in-invite.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userModel: typeof User){}

    async createUser (dto: CreateUserDto) {
        const user = await this.userModel.create({...dto, isActive: false})
        return user
    }

    async getAllUsers () {
        const users = await this.userModel.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail (email: string) {
        const user = await this.userModel.findOne({where: {email}})
        return user
    }

    async getUserById (user_id: number) {
        const user = await this.userModel.findByPk(user_id)
        return user
    }
}
