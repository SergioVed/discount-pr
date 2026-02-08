import { Restaurant } from "src/core/entities/Restaurant/Restaurant";
import { CreateRestaurantDto } from "./dto/CreateRestaurantDto";


export interface IRestaurantRepository {
    createRestaurant(dto: CreateRestaurantDto): Promise<Restaurant>
    getAllRestaurants(): Promise<Restaurant[]>
}