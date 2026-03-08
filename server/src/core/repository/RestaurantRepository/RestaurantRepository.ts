import { Restaurant } from 'src/core/entities/Restaurant/Restaurant';
import { CreateRestaurantPersistenceDto } from './dto/CreateRestaurantPersistenceDto';
import { Transaction } from 'sequelize';

export interface IRestaurantRepository {
  create(data: CreateRestaurantPersistenceDto): Promise<Restaurant>;
  update(restaurant: Restaurant, tx?: Transaction): Promise<Restaurant | null>;
  findById(restaurantId: number, tx?: Transaction): Promise<Restaurant | null>;
  getAll(): Promise<Restaurant[]>;
}
