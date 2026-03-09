import { User } from "src/core/entities/User/User";

export class UserResponseMapper {

    static toResponse (user: User) {
        return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            isActive: user.isActive
        }
    }
}