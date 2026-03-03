import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./UserModel";
import { RestaurantModel } from "./RestaurantModel";

interface SpecialOfferCreationAttrs {
    created_by: number
    restaurant_id: number
    title: string
    description: string
    isActive: boolean
    active_from: Date
    active_to: Date
}

@Table({tableName: 'special_offer'})
export class SpecialOfferModel extends Model<SpecialOfferModel, SpecialOfferCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    declare special_offer_id: number

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare created_by: number

    @ForeignKey(() => RestaurantModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    declare restaurant_id: number

    @Column({type: DataType.STRING, allowNull: false})
    declare title: string

    @Column({type: DataType.STRING, allowNull: false})
    declare description: string

    @Column({type: DataType.BOOLEAN, allowNull: false})
    declare isActive: boolean

    @Column({type: DataType.DATE, allowNull: false})
    declare active_from: Date

    @Column({type: DataType.DATE, allowNull: false})
    declare active_to: Date

    @BelongsTo(() => RestaurantModel, {foreignKey: "restaurant_id"})
    declare restaurant: RestaurantModel

    @BelongsTo(() => UserModel, {foreignKey: "created_by", targetKey: "user_id"})
    declare user: UserModel

    // picture
}