import { User } from "src/core/entities/User/User";
import { CreateUserDto } from "./dto/CreateUserDto";

export interface IUserRepository {
    getAllUsers(): Promise<User[]>
    createUser(dto: CreateUserDto): Promise<User>
}