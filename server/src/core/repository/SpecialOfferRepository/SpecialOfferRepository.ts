import { SpecialOffer } from 'src/core/entities/SpecialOffer/SpecialOffer';

export interface ISpecialOfferRepository {
  create(dto: SpecialOffer): Promise<SpecialOffer>;
  getAll(): Promise<SpecialOffer[]>;
  getRestaurantOffers(restaurantId: number): Promise<SpecialOffer[]>;
}
