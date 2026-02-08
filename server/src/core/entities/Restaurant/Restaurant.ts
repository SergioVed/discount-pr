
export class Restaurant {
    constructor(
        readonly restaurantId: number,
        readonly googlePlaceId: number,
        readonly name: string,
        readonly types: string[],
        readonly googlemapsLink: string,
        readonly address: string,
        readonly phoneNum: string,
        readonly openingHours: JSON,
        readonly priceLevel: number,
        readonly rating: number,
        readonly websiteLink: string,
        readonly description: string,
        readonly lastSynced: Date,
        readonly userRatingsTotal: number
    ) { }
}