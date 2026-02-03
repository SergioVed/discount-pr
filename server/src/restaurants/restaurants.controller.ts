import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private restaurantService: RestaurantsService){}

    @Post()
    async createRestaurant (@Body() dto: CreateRestaurantDto) {
        const restaurant = await this.restaurantService.createRestaurant(dto)
        return restaurant
    }
    
    @Get()
    async getAllRestaurants () {
        const restaurants = await this.restaurantService.getAllRestaurants()
        return restaurants
    }

    @Put()
    async updateRestaurant () {
        
    }
}
