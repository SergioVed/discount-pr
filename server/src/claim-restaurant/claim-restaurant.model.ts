import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Restaurant } from "src/restaurants/restaurant.model";
import { User } from "src/users/user.model";

interface ClaimRequestCreationAttrs {
    user_id: number
    restaurant_id: number
    status?: 'pending' | 'aproved' | 'denied'
}

@Table({tableName: 'claim_restaurant_request'})
export class Claim_request extends Model<Claim_request, ClaimRequestCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    claim_request_id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number

    @ForeignKey(() => Restaurant)
    @Column({type: DataType.INTEGER, allowNull: false})
    restaurant_id: number

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'pending'})
    status: 'pending' | 'aproved' | 'denied'
}