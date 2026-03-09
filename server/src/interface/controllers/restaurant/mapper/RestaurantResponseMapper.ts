import { Restaurant } from 'src/core/entities/Restaurant/Restaurant';

export class RestaurantResponseMapper {
  static toResponse(restaurant: Restaurant) {
    return {
      restaurantId: restaurant.restaurantId,
      managerId: restaurant.managerId,
      googlePlaceId: restaurant.googlePlaceId,
      name: restaurant.name,
      types: restaurant.types,
      googlemapsLink: restaurant.googlemapsLink,
      address: restaurant.address,
      phoneNum: restaurant.phoneNum,
      openingHours: restaurant.openingHours,
      priceLevel: restaurant.priceLevel,
      rating: restaurant.rating,
      websiteLink: restaurant.websiteLink,
      description: restaurant.description,
      lastSynced: restaurant.lastSynced,
      userRatingsTotal: restaurant.userRatingsTotal,
    };
  }
}
