import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatecClaimRequestDto {
    @IsNotEmpty()
    @IsNumber()
    readonly restaurantId: number;
}
