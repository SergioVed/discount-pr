import { Timestamp } from "rxjs";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RestaurantCreationAttrs {
    google_place_id: number
    name: string
    type: string
    googlemaps_link: string
    address: string
    phone_num: string
    opening_hours: JSON
    price_level: number
    rating: number
    website_link: string
    descriptuon: string
    user_ratings_total: number
}


@Table({ tableName: 'restaurant' })
export class Restaurant extends Model<Restaurant, RestaurantCreationAttrs> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    restaurant_id: number

    @Column({ type: DataType.INTEGER, allowNull: false})
    google_place_id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    type: string

    @Column({ type: DataType.STRING, allowNull: false })
    googlemaps_link: string

    @Column({ type: DataType.STRING, allowNull: false })
    address: string

    @Column({ type: DataType.STRING, allowNull: false })
    phone_num: string

    @Column({ type: DataType.JSONB, allowNull: false })
    opening_hours: JSON

    // picture
    
    @Column({ type: DataType.INTEGER, allowNull: false })
    price_level: number

    @Column({ type: DataType.DOUBLE, allowNull: false })
    rating: number

    @Column({ type: DataType.STRING, allowNull: false })
    website_link: string

    @Column({ type: DataType.STRING, allowNull: false })
    descriptuon: string

    @Column({ type: DataType.DATE })
    last_synced: Date

    @Column({type: DataType.INTEGER, allowNull: false})
    user_ratings_total: number
}