
export class CreateRestaurantDto {
    readonly googlePlaceId: number
    readonly name: string
    readonly type: string
    readonly googlemapsLink: string
    readonly address: string
    readonly phoneNum: string
    readonly openingHours: JSON
    readonly priceLevel: number
    readonly rating: number
    readonly websiteLink: string
    readonly description: string
    readonly userRatingsTotal: number
}