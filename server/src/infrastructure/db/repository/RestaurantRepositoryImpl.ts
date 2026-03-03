import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Restaurant } from "src/core/entities/Restaurant/Restaurant";
import { IRestaurantRepository } from "src/core/repository/RestaurantRepository/RestaurantRepository";
import { RestaurantModel } from "../entities/RestaurantModel";
import { RestaurantMapper } from "../mappers/RestaurantMapper";
import { CreateRestaurantDto } from "src/core/repository/RestaurantRepository/dto/CreateRestaurantDto";

@Injectable()
export class RestaurantRepositoryImpl implements IRestaurantRepository {

    constructor(
        @InjectModel(RestaurantModel) private restautantModel: typeof RestaurantModel,
        private restaurantMapper: RestaurantMapper
    ) { }
    
    async findById(restaurantId: number): Promise<Restaurant | null> {
        const restaurant = await this.restautantModel.findByPk(restaurantId)
        if (!restaurant) {
            return null
        }
        return this.restaurantMapper.toDomain(restaurant)
    }

    async update (restaurant: Restaurant): Promise<Restaurant | null> {
        const persistence = this.restaurantMapper.toPersistence(restaurant)

        const [affectedRows] = await this.restautantModel.update(persistence, {
            where: {restaurant_id: restaurant.restaurantId},
            returning: true
        })
        if (affectedRows == 0) {
            return null
        }

        return restaurant
    }

    async create(dto: CreateRestaurantDto): Promise<Restaurant> {
        const persistence = this.restaurantMapper.toCreationPersistence(dto)

        const restaurant = await this.restautantModel.create(persistence)
        return this.restaurantMapper.toDomain(restaurant)
    }

    async getAll(): Promise<Restaurant[]> {
        const restaurants = await this.restautantModel.findAll({include: {all: true}})
        return restaurants.map((e) => this.restaurantMapper.toDomain(e))
    }

} 