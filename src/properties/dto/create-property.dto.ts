import { IsEnum, IsInt, IsNumber, IsString, MaxLength } from 'class-validator';
import { PropertyType, propertyTypesArray } from '../property-type';

export default class CreatePropertyDto {
  @IsString()
  @MaxLength(255)
  propertyName: string;

  @IsEnum(propertyTypesArray, {
    message: 'Property Type should be House, Apartment or Mobile',
  })
  propertyType: PropertyType;

  @IsString()
  location: string;

  @IsNumber()
  squareFeet: number;

  @IsInt()
  noOfBedrooms: number;

  @IsInt()
  noOfBathrooms: number;
}
