import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SpecialOfferCreationAttrs {
    creared_by: number
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
    special_offer_id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    creared_by: number

    @Column({type: DataType.INTEGER, allowNull: false})
    restaurant_id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @Column({type: DataType.BOOLEAN, allowNull: false})
    isActive: boolean

    @Column({type: DataType.DATE, allowNull: false})
    active_from: Date

    @Column({type: DataType.DATE, allowNull: false})
    active_to: Date

    // picture
}