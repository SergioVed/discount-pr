import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";


interface TokenCreationAttrs {
    token: string
    user_id: number
}

@Table({tableName: 'token'})
export class TokenModel extends Model<TokenModel, TokenCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare token_id: number

    @Column({type: DataType.STRING, allowNull: false})
    declare token: string

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare user_id: number

}