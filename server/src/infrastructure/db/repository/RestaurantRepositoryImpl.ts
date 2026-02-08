import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Restaurant } from "src/core/entities/Restaurant/Restaurant";
import { CreateRestaurantDto } from "src/core/repository/RestaurantRepository/dto/CreateRestaurantDto";
import { IRestaurantRepository } from "src/core/repository/RestaurantRepository/RestaurantRepository";
import { RestaurantModel } from "../entities/RestaurantModel";
import { RestaurantMapper } from "../mappers/RestaurantMapper";


@Injectable()
export class RestaurantRepositoryImpl implements IRestaurantRepository {

    constructor (
        @InjectModel(RestaurantModel) private restautantModel: typeof RestaurantModel,
        private restaurantMapper: RestaurantMapper
    ) {}

    async createRestaurant(dto: CreateRestaurantDto): Promise<Restaurant> {
        const modelData = {
            google_place_id: dto.googlePlaceId,
            name: dto.name,
            type: dto.type,
            googlemaps_link: dto.googlemapsLink,
            address: dto.address,
            phone_num: dto.phoneNum,
            opening_hours: dto.openingHours,
            price_level: dto.priceLevel,
            rating: dto.rating,
            website_link: dto.websiteLink,
            description: dto.description,
            user_ratings_total: dto.userRatingsTotal
        }
        const restaurant = await this.restautantModel.create(modelData)
        return this.restaurantMapper.toDomain(restaurant)
    }   
    async getAllRestaurants(): Promise<Restaurant[]> {
        const restaurants = await this.restautantModel.findAll()
        return restaurants.map((e) => this.restaurantMapper.toDomain(e))
    }   
    
}