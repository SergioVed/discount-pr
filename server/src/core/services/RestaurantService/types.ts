export type CreateRestaurantInput = { googlePlaceId: string }

export type UpdateRestaurantInput = {
    readonly name?: string;
    readonly types?: string[];
    readonly googlemapsLink?: string;
    readonly address?: string;
    readonly phoneNum?: string;
    readonly openingHours?: JSON;
    readonly priceLevel?: number;
    readonly websiteLink?: string;
    readonly description?: string;
}