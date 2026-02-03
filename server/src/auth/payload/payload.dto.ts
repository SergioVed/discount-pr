import { User } from "src/users/user.model"

export class PayloadDto {
    user_id: number
    role: string
    
    constructor (model: User) {
        this.role = model.role
        this.user_id = model.user_id
    }

}