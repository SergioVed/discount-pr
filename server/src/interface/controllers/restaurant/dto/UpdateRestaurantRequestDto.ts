import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateRestaurantRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly types?: string[];

  @IsOptional()
  @IsUrl()
  readonly googlemapsLink?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly phoneNum?: string;

  @IsOptional()
  @IsObject()
  readonly openingHours?: JSON;

  @IsOptional()
  @IsNumber()
  readonly priceLevel?: number;

  @IsOptional()
  @IsUrl()
  readonly websiteLink?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string;
}
