import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantRequestDto {

    @IsString()
    @IsNotEmpty()
    readonly googlePlaceId: string;
}