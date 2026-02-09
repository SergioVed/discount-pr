import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/core/entities/User/User";
import { CreateUserDto } from "src/core/repository/UserRepository/dto/CreateUserDto";
import { IUserRepository } from "src/core/repository/UserRepository/UserRepository";
import { UserModel } from "../entities/UserModel";
import { UserMapper } from "../mappers/UserMapper";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepositoryImpl implements IUserRepository {

    constructor (
        @InjectModel(UserModel) private userModel: typeof UserModel,
        private userMapper: UserMapper
    ) {}

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({where: {email}})
        if (!user) {
            return null
        }
        return this.userMapper.toDomain(user)
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.findAll();
        return users.map((e) => this.userMapper.toDomain(e))
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const modelData = {
            first_name: dto.firstName,
            last_name: dto.lastName,
            role: dto.role,
            email: dto.email,
            password: dto.password
        }
        const user = await this.userModel.create(modelData)
        return this.userMapper.toDomain(user)
    }
    
}