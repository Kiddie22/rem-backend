import { IsEnum, IsInt, IsString, MaxLength } from 'class-validator';
import { PropertyType, PropertyTypesArray } from '../property-type';

export default class CreatePropertyDto {
  @IsString()
  @MaxLength(30)
  propertyName: string;

  @IsEnum(PropertyTypesArray)
  propertyType: PropertyType;

  @IsInt()
  noOfBedrooms: number;

  @IsInt()
  noOfBathrooms: number;
}
