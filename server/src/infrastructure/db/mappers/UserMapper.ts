import { User } from "src/core/entities/User/User"
import { UserModel } from "../entities/UserModel"
import { Injectable } from "@nestjs/common"

interface Mapper <T, E> {
    toDomain(entity: T): E
    toModel(entity: E): any
}

@Injectable()
export class UserMapper implements Mapper<UserModel, User> {
    

    toDomain (entity: UserModel): User {
        return new User (
            entity.user_id,
            entity.restaurant_id,
            entity.first_name,
            entity.last_name,
            entity.role as 'ADMIN' | 'MANAGER',
            entity.email,
            entity.password,
            entity.isActive
        )
    }

    toModel (entity: User): any {
        return {
            user_id: entity.userId,
            restaurant_id: entity.restaurantId,
            first_name: entity.firstName,
            last_name: entity.lastName,
            role: entity.role,
            email: entity.email,
            password: entity.password,
            isActive: entity.isActive
        }
    }
}