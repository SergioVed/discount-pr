import { Inject, Injectable } from '@nestjs/common';
import type { ISpecialOfferRepository } from 'src/core/repository/SpecialOfferRepository/SpecialOfferRepository';
import type { IRestaurantRepository } from 'src/core/repository/RestaurantRepository/RestaurantRepository';
import { CreateSpecialOfferInput } from './types';
import { SpecialOffer } from 'src/core/entities/SpecialOffer/SpecialOffer';
import { InvalidManagerId } from 'src/core/errors/cases/application/specialOffer/InvalidManagerId';
import { EntityNotFoundError } from 'src/core/errors/cases/application/shared/EntityNotFoundError';

@Injectable()
export class SpecialOfferService {
  constructor(
    @Inject('ISpecialOfferRepository') private specialOfferRepository: ISpecialOfferRepository,
    @Inject('IRestaurantRepository') private restaurantRepository: IRestaurantRepository
  ) { }

  async createOffer(dto: CreateSpecialOfferInput, userId: number) {

    const activeFrom = dto.activeFrom ?? new Date()
    const activeTo = dto.activeTo

    const offer = SpecialOffer.create({ ...dto, createdBy: userId, activeFrom, activeTo })
    const restaurant = await this.restaurantRepository.findById(dto.restaurantId)
    if (!restaurant) {
      throw new EntityNotFoundError("Restaurant", dto.restaurantId)
    }
    if (restaurant.managerId !== userId) {
      throw new InvalidManagerId(userId)
    }
    return await this.specialOfferRepository.create(offer);
  }

  async getAllOffers() {
    const offers = await this.specialOfferRepository.getAll();
    return offers;
  }

  async getRestaurantOffer(restaurantId: number) {
    const offers = await this.specialOfferRepository.getRestaurantOffers(restaurantId);
    return offers;
  }
}
