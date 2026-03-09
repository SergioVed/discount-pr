import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateRestaurantRequestDto } from './dto/CreateRestaurantRequestDto';
import { RestaurantsService } from 'src/core/services/RestaurantService/RestaurantService';
import { AuthGuard } from '../../guards/AuthGuard';
import { UpdateRestaurantRequestDto } from './dto/UpdateRestaurantRequestDto';
import { IsActivated } from '../../guards/IsActivatedGuard';
import { Roles } from '../../decorators/RoleDecorator';
import { RoleGuard } from '../../guards/RoleGuard';
import { RestaurantResponseMapper } from './mapper/RestaurantResponseMapper';

@Controller('restaurants')
export class RestaurantController {
  constructor(private restaurantService: RestaurantsService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, IsActivated, RoleGuard)
  @Post()
  async createRestaurant(@Body() body: CreateRestaurantRequestDto) {
    const restaurant = await this.restaurantService.createRestaurant(body);
    return RestaurantResponseMapper.toResponse(restaurant);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, IsActivated, RoleGuard)
  @Get()
  async getAllRestaurants() {
    const restaurants = await this.restaurantService.getAllRestaurants();
    return restaurants.map((restaurant) =>
      RestaurantResponseMapper.toResponse(restaurant),
    );
  }

  @Roles('ADMIN', 'MANAGER')
  @UseGuards(AuthGuard, IsActivated, RoleGuard)
  @Put('sync/:id')
  async syncRestaurant(@Param('id', ParseIntPipe) id: number,  @Req() req: any) {
    const restaurant = await this.restaurantService.syncRestaurant(id, req.user._userId);
    return RestaurantResponseMapper.toResponse(restaurant);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, IsActivated, RoleGuard)
  @Put('/:id')
  async updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRestaurantRequestDto,
  ) {
    const restaurant = await this.restaurantService.updateRestaurant(id, dto);
    return RestaurantResponseMapper.toResponse(restaurant);
  }
}
