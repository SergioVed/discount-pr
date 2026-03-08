import { SpecialOffer } from 'src/core/entities/SpecialOffer/SpecialOffer';
import { SpecialOfferModel } from '../entities/SpecialOfferModel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpecialOfferMapper {
  toDomain(entity: SpecialOfferModel): SpecialOffer {
    return new SpecialOffer(
      entity.special_offer_id,
      entity.created_by,
      entity.restaurant_id,
      entity.title,
      entity.description,
      entity.isActive,
      entity.active_from,
      entity.active_to,
    );
  }
  toModel(entity: SpecialOffer) {
    return {
      special_offer_id: entity.specialOfferId,
      created_by: entity.createdBy,
      restaurant_id: entity.restaurantId,
      title: entity.title,
      description: entity.description,
      isActive: entity.isActive,
      active_from: entity.activeFrom,
      active_to: entity.activeTo,
    };
  }
  toCreationPersistence(offer: SpecialOffer) {
    return {
      created_by: offer.createdBy,
      restaurant_id: offer.restaurantId,
      title: offer.title,
      description: offer.description,
      isActive: offer.isActive,
      active_from: offer.activeFrom,
      active_to: offer.activeTo,
    }
  }
}
