import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/core/entities/User/User";
import { IUserRepository } from "src/core/repository/UserRepository/UserRepository";
import { UserModel } from "../entities/UserModel";
import { UserMapper } from "../mappers/UserMapper";
import { Injectable } from "@nestjs/common";
import { CreateUserDtoRepository } from "src/core/repository/UserRepository/dto/CreateUserDtoRepository";


@Injectable()
export class UserRepositoryImpl implements IUserRepository {

    constructor (
        @InjectModel(UserModel) private userModel: typeof UserModel,
        private userMapper: UserMapper
    ) {}

    async update(user: User): Promise<User | null> {
        const persistance = this.userMapper.toPersistance(user)
        const [affected] = await this.userModel.update(persistance, {
            where: {user_id: user.userId}
        })

        if (affected === 0) {
            return null
        }
        return user
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userModel.findByPk(id)
        if (!user) {
            return null
        }
        return this.userMapper.toDomain(user)
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({where: {email}})
        if (!user) {
            return null
        }
        return this.userMapper.toDomain(user)
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.findAll();
        return users.map((e) => this.userMapper.toDomain(e))
    }

    async create(dto: CreateUserDtoRepository): Promise<User> {
        const modelData = this.userMapper.toCreatePersistance(dto)
        const user = await this.userModel.create(modelData)
        return this.userMapper.toDomain(user)
    }
    
}