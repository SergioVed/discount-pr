import { SpecialOffer } from 'src/core/entities/SpecialOffer/SpecialOffer';

export class SpecialOfferResponseMapper {
  static toResponse(offer: SpecialOffer) {
    return {
      specialOfferId: offer.specialOfferId,
      createdBy: offer.createdBy,
      restaurantId: offer.restaurantId,
      title: offer.title,
      description: offer.description,
      isActive: offer.isActive,
      activeFrom: offer.activeFrom,
      activeTo: offer.activeTo,
    };
  }
}
