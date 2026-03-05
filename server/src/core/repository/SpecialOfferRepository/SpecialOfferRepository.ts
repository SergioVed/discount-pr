import { SpecialOffer } from 'src/core/entities/SpecialOffer/SpecialOffer';
import { CreateSpecialOfferDto } from './dto/CreateSpecialOfferDto';

export interface ISpecialOfferRepository {
  create(dto: CreateSpecialOfferDto): Promise<SpecialOffer>;
  getAll(): Promise<SpecialOffer[]>;
  getRestaurantOffers(restaurantId: number): Promise<SpecialOffer[] | null>;
}
