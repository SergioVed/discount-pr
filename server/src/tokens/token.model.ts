import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface TokenCreationAttrs {
    token: string
    user_id: number
}

@Table({tableName: 'token'})
export class Token extends Model<Token, TokenCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare token_id: number

    @Column({type: DataType.STRING, allowNull: false})
    declare token: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare user_id: number

    @BelongsTo(() => User)
    declare user: User
}