import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { SpecialOfferModel } from './SpecialOfferModel';
import { UserModel } from './UserModel';

interface RestaurantCreationAttrs {
  google_place_id: string;
  name: string;
  types: string[];
  googlemaps_link: string;
  formatted_address: string;
  phone_num: string;
  opening_hours: JSON;
  price_level: number;
  rating: number;
  website_link: string;
  descriptuon: string;
  last_synced: Date;
  user_ratings_total: number;
}

@Table({ tableName: 'restaurant' })
export class RestaurantModel extends Model<
  RestaurantModel,
  RestaurantCreationAttrs
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare restaurant_id: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare manager_id: number | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare google_place_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.JSON, allowNull: false })
  declare types: string[];

  @Column({ type: DataType.STRING, allowNull: false })
  declare googlemaps_link: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare formatted_address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare phone_num: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  declare opening_hours: JSON;

  // picture

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price_level: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  declare rating: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare website_link: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare descriptuon: string;

  @Column({ type: DataType.DATE })
  declare last_synced: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_ratings_total: number;

  @HasMany(() => SpecialOfferModel)
  declare offers: SpecialOfferModel[];

  @BelongsTo(() => UserModel)
  declare manager: UserModel;
}
