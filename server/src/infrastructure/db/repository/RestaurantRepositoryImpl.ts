import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurant } from 'src/core/entities/Restaurant/Restaurant';
import { IRestaurantRepository } from 'src/core/repository/RestaurantRepository/RestaurantRepository';
import { RestaurantModel } from '../entities/RestaurantModel';
import { RestaurantMapper } from '../mappers/RestaurantMapper';
import { CreateRestaurantPersistenceDto } from 'src/core/repository/RestaurantRepository/dto/CreateRestaurantPersistenceDto';
import { Transaction } from 'sequelize';

@Injectable()
export class RestaurantRepositoryImpl implements IRestaurantRepository {
  constructor(
    @InjectModel(RestaurantModel)
    private restautantModel: typeof RestaurantModel,
    private restaurantMapper: RestaurantMapper,
  ) {}

  async findById(restaurantId: number, tx: Transaction): Promise<Restaurant | null> {
    const restaurant = await this.restautantModel.findByPk(restaurantId, {transaction: tx});
    if (!restaurant) {
      return null;
    }
    return this.restaurantMapper.toDomain(restaurant);
  }

  async update(restaurant: Restaurant, tx: Transaction): Promise<Restaurant | null> {
    const persistence = this.restaurantMapper.toPersistence(restaurant);

    const [affectedRows] = await this.restautantModel.update(persistence, {
      where: { restaurant_id: restaurant.restaurantId },
      returning: true,
      transaction: tx
    });
    if (affectedRows == 0) {
      return null;
    }

    return restaurant;
  }

  async create(dto: CreateRestaurantPersistenceDto): Promise<Restaurant> {
    const persistence = this.restaurantMapper.toCreationPersistence(dto);

    const restaurant = await this.restautantModel.create(persistence);
    return this.restaurantMapper.toDomain(restaurant);
  }

  async getAll(): Promise<Restaurant[]> {
    const restaurants = await this.restautantModel.findAll({
      include: { all: true },
    });
    return restaurants.map((e) => this.restaurantMapper.toDomain(e));
  }
}
