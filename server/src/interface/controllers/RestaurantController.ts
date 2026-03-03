import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/core/repository/RestaurantRepository/dto/CreateRestaurantDto';
import { RestaurantsService } from 'src/core/services/RestaurantService/RestaurantService';
import { AuthGuard } from '../guards/AuthGuard';
import { UpdateRestaurantDto } from 'src/core/repository/RestaurantRepository/dto/UpdateRestarauntDto';
import { IsActivated } from '../guards/IsActivatedGuard';
import { Roles } from '../decorators/RoleDecorator';
import { RoleGuard } from '../guards/RoleGuard';

@Controller('restaurants')
export class RestaurantController {
    constructor(
        private restaurantService: RestaurantsService
    ){}

    @Roles('ADMIN')
    @UseGuards(AuthGuard, IsActivated, RoleGuard)
    @Post()
    async createRestaurant (@Body() body: CreateRestaurantDto) {
        const restaurant = await this.restaurantService.createRestaurant(body)
        return restaurant
    }

    @Roles('ADMIN')
    @UseGuards(AuthGuard, IsActivated, RoleGuard)
    @Get()
    async getAllRestaurants () {
        const restaurants = await this.restaurantService.getAllRestaurants()
        return restaurants
    }

    @Put('sync/:id')
    async syncRestaurant (@Param('id') id: number) {
        const restaurant = await this.restaurantService.syncRestaurant(id)
        return restaurant
        
    }

    @Put('/:id')
    async updateRestaurant (
        @Param('id') id: number,
        @Body() dto: UpdateRestaurantDto
    ) {
        const restaurant = await this.restaurantService.updateRestaurant(id, dto)
        return restaurant
    }
}
