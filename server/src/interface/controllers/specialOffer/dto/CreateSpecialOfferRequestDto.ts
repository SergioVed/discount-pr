import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSpecialOfferRequestDto {

    @IsNumber() @IsNotEmpty()
    restaurantId: number;

    @IsString() @IsNotEmpty()
    title: string;

    @IsString() @IsNotEmpty()
    description: string;

    @IsOptional() @IsBoolean()
    isActive?: boolean;

    @IsOptional() @IsDateString()
    activeFrom?: Date;

    @IsDateString()
    activeTo: Date;
}