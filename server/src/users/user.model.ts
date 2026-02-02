import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { SignIn_invite } from "src/sign-in-invites/sing-in-invite.model";
import { Token } from "src/tokens/token.model";

interface UserCreationAttrs {
    first_name: string
    last_name: string
    role: 'ADMIN' | 'MANAGER'
    email: string  
    password: string
    isActive?: boolean
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare user_id: number

    @Column({type: DataType.INTEGER})
    declare restaurant_id: number

    @Column({type: DataType.STRING, allowNull: false})
    declare first_name: string

    @Column({type: DataType.STRING, allowNull: false})
    declare last_name: string

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'MANAGER'})
    declare role: 'ADMIN' | 'MANAGER'

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    declare email: string  

    @Column({type: DataType.STRING, allowNull: false})
    declare password: string  

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    declare isActive: boolean

    @HasMany(() => SignIn_invite)
    invites: SignIn_invite[]

    @HasOne(() => Token)
    token: Token

}