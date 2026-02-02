
export class CreateRestaurantDto {
    google_place_id: number
    name: string
    type: string
    googlemaps_link: string
    address: string
    phone_num: string
    opening_hours: JSON
    price_level: number
    rating: number
    website_link: string
    descriptuon: string
    user_ratings_total: number
}