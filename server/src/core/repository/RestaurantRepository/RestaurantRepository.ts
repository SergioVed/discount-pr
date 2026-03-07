import { Restaurant } from 'src/core/entities/Restaurant/Restaurant';
import { CreateRestaurantPersistenceDto } from './dto/CreateRestaurantPersistenceDto';

export interface IRestaurantRepository {
  create(data: CreateRestaurantPersistenceDto): Promise<Restaurant>;
  update(restaurant: Restaurant): Promise<Restaurant | null>;
  findById(restaurantId: number): Promise<Restaurant | null>;
  getAll(): Promise<Restaurant[]>;
}
