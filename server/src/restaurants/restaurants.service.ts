import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurant } from './restaurant.model';
import { CreateRestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantsService {

    constructor(@InjectModel(Restaurant) private restaurantModel: typeof Restaurant){}

    async createRestaurant (dto: CreateRestaurantDto) {
        const restaurant = await this.restaurantModel.create(dto)
        return restaurant
    }

    async getAllRestaurants () {
        const restaurants = await this.restaurantModel.findAll()
        return restaurants
    }
}
