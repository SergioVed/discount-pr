import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { RestaurantModel } from "./RestaurantModel";

interface UserCreationAttrs {
    first_name: string
    last_name: string
    role: 'ADMIN' | 'MANAGER'
    email: string  
    password: string
    isActive?: boolean
}

@Table({tableName: 'user'})
export class UserModel extends Model<UserModel, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare user_id: number

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

}