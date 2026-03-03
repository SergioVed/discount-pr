import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";
import { RestaurantModel } from "./RestaurantModel";


@Table({tableName: "claim_restaurant_request"})
export class ClaimRequestModel extends Model {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare claim_request_id: number

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare user_id: number

    @ForeignKey(() => RestaurantModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare restaurant_id: number

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "PENDING"})
    declare status: string

    @BelongsTo(() => UserModel)
    user: UserModel

    @BelongsTo(() => RestaurantModel)
    restaurant: RestaurantModel
}