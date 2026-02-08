import { Restaurant } from "src/core/entities/Restaurant/Restaurant"
import { RestaurantModel } from "../entities/RestaurantModel"

interface Mapper <T, E> {
    toDomain(entity: T): E
    toModel(entity: E): any
}

export class RestaurantMapper implements Mapper<RestaurantModel, Restaurant> {
    toDomain(entity: RestaurantModel): Restaurant {
        return new Restaurant (
            entity.restaurant_id,
            entity.google_place_id,
            entity.name,
            entity.types,
            entity.googlemaps_link,
            entity.formatted_address,
            entity.phone_num,
            entity.opening_hours,
            entity.price_level,
            entity.rating,
            entity.website_link,
            entity.descriptuon,
            entity.last_synced,
            entity.user_ratings_total
        )
    }

    toModel(entity: Restaurant) {
        return {
            restaurant_id: entity.restaurantId,
            google_place_id: entity.googlePlaceId,
            name: entity.name,
            types: entity.types,
            googlemaps_link: entity.googlemapsLink,
            formatted_address: entity.address,
            phone_num: entity.phoneNum,
            opening_hours: entity.openingHours,
            price_level: entity.priceLevel,
            rating: entity.rating,
            website_link: entity.websiteLink,
            descriptuon: entity.description,
            last_synced: entity.lastSynced,
            user_ratings_total: entity.userRatingsTotal
        }            
    }
}