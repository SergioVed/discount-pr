import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/core/errors/cases/application/shared/EntityNotFoundError';
import { SyncFromGoogleError } from 'src/core/errors/cases/application/restaurant/SyncFromGoogleError';
import type { IGooglePlaceRepository } from 'src/core/repository/GooglePlaceDetails/GooglePlace';
import type { IRestaurantRepository } from 'src/core/repository/RestaurantRepository/RestaurantRepository';
import { canSyncGoogle } from 'src/helpers/restaurant/canSyncGoogle';
import { CreateRestaurantInput, UpdateRestaurantInput } from './types';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject('IRestaurantRepository')
    private restaurantRepository: IRestaurantRepository,
    @Inject('IGooglePlaceRepository')
    private placeRepository: IGooglePlaceRepository,
  ) {}

  async createRestaurant(dto: CreateRestaurantInput  ) {
    const details = await this.placeRepository.getDetails(dto.googlePlaceId);
    const restaurant = await this.restaurantRepository.create({
      ...details,
      lastSynced: new Date(),
      googlePlaceId: dto.googlePlaceId,
    });
    return restaurant;
  }

  async getAllRestaurants() {
    const restaurants = await this.restaurantRepository.getAll();
    return restaurants;
  }

  async getOneRestaurant(restaurantId: number) {
    const restaurant = await this.restaurantRepository.findById(restaurantId);
    return restaurant;
  }

  async updateRestaurant(restaurantId: number, dto: UpdateRestaurantInput) {
    const restaurant = await this.restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new EntityNotFoundError('Restaurant', restaurantId);
    }
    restaurant.updateInstance(dto);
    return await this.restaurantRepository.update(restaurant);
  }

  async syncRestaurant(restaurantId: number) {
    const restaurant = await this.getOneRestaurant(restaurantId);
    if (!restaurant) {
      throw new EntityNotFoundError('Restaurant', restaurantId);
    }
    if (!canSyncGoogle(restaurant)) {
      throw new SyncFromGoogleError(restaurant.lastSynced);
    }
    const details = await this.placeRepository.getDetails(
      restaurant.googlePlaceId,
    );

    restaurant.updateInstance(details);
    restaurant.updateLastSynced(new Date());
    return await this.restaurantRepository.update(restaurant);
  }
}
