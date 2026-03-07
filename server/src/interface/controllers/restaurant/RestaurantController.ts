import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRestaurantRequestDto } from './dto/CreateRestaurantRequestDto';
import { RestaurantsService } from 'src/core/services/RestaurantService/RestaurantService';
import { AuthGuard } from '../../guards/AuthGuard';
import { UpdateRestaurantRequestDto } from './dto/UpdateRestaurantRequestDto';
import { IsActivated } from '../../guards/IsActivatedGuard';
import { Roles } from '../../decorators/RoleDecorator';
import { RoleGuard } from '../../guards/RoleGuard';

@Controller('restaurants')
export class RestaurantController {
  constructor(private restaurantService: RestaurantsService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, IsActivated, RoleGuard)
  @Post()
  async createRestaurant(@Body() body: CreateRestaurantRequestDto) {
    const restaurant = await this.restaurantService.createRestaurant(body);
    return restaurant;
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, IsActivated, RoleGuard)
  @Get()
  async getAllRestaurants() {
    const restaurants = await this.restaurantService.getAllRestaurants();
    return restaurants;
  }

  @Put('sync/:id')
  async syncRestaurant(@Param('id', ParseIntPipe) id: number) {
    const restaurant = await this.restaurantService.syncRestaurant(id);
    return restaurant;
  }

  @Put('/:id')
  async updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRestaurantRequestDto,
  ) {
    const restaurant = await this.restaurantService.updateRestaurant(id, dto);
    return restaurant;
  }
}
