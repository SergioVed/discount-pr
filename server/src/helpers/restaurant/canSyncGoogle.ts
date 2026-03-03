import { PlaceDetails } from "src/core/entities/GooglePlaceDetails/PlaceDetails";
import { Restaurant } from "src/core/entities/Restaurant/Restaurant";

export const canSyncGoogle = (restaurant: Restaurant): boolean => {
    const lastSynced = restaurant.lastSynced
    const nextAllowedSync = new Date(lastSynced)
    nextAllowedSync.setDate(nextAllowedSync.getDate() + 7)

    return new Date() > nextAllowedSync;
}