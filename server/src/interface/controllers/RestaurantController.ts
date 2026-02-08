import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/core/repository/RestaurantRepository/dto/CreateRestaurantDto';
import { CreateUserDto } from 'src/core/repository/UserRepository/dto/CreateUserDto';
import { RestaurantsService } from 'src/core/services/RestaurantService/RestaurantService';
import { UserService } from 'src/core/services/UserService/UserService';

@Controller('restaurants')
export class RestaurantController {

    constructor(
        private restaurantService: RestaurantsService
    ){}

    @Post()
    async createUser (@Body() dto: CreateRestaurantDto) {
        const restaurant = await this.restaurantService.createRestaurant(dto)
        return restaurant
    }

    @Get()
    async getAllUsers () {
        const restaurants = await this.restaurantService.getAllRestaurants()
        return restaurants
    }
}
