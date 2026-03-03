import { User } from "src/core/entities/User/User";
import { CreateUserDtoRepository } from "./dto/CreateUserDtoRepository";

export interface IUserRepository {
    getAll(): Promise<User[]>
    create(dto: CreateUserDtoRepository): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
    findById(id: number): Promise<User | null>
    update(user: User): Promise<User | null>
}