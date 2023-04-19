import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PropertyType, propertyTypesArray } from '../property-type';

export default class UpdatePropertyDto {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  propertyName: string;

  @IsEnum(propertyTypesArray)
  @IsOptional()
  propertyType: PropertyType;

  @IsInt()
  @IsOptional()
  noOfBedrooms: number;

  @IsInt()
  @IsOptional()
  noOfBathrooms: number;
}
