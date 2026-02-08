import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRestaurantDto } from 'src/core/repository/RestaurantRepository/dto/CreateRestaurantDto';
import type { IRestaurantRepository } from 'src/core/repository/RestaurantRepository/RestaurantRepository';

@Injectable()
export class RestaurantsService {

    constructor(
        @Inject('IRestaurantRepository') private restaurantRepository: IRestaurantRepository
    ){}

    async createRestaurant (dto: CreateRestaurantDto) {
        const restaurant = await this.restaurantRepository.createRestaurant(dto)
        return restaurant
    }

    async getAllRestaurants () {
        const restaurants = await this.restaurantRepository.getAllRestaurants()
        return restaurants
    }
}