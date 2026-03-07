export type UpdateRestaurantProps = {
    readonly name?: string;
    readonly types?: string[];
    readonly googlemapsLink?: string;
    readonly address?: string;
    readonly phoneNum?: string;
    readonly openingHours?: JSON;
    readonly priceLevel?: number;
    readonly websiteLink?: string;
    readonly description?: string;
    readonly rating?: number
    readonly userRatingsTotal?: number
}