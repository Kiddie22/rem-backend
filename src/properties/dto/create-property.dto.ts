import { IsEnum, IsInt, IsString, MaxLength } from 'class-validator';
import { PropertyType } from '../property.entity';

export default class CreatePropertyDto {
  @IsString()
  @MaxLength(30)
  propertyName: string;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsInt()
  noOfBedrooms: number;

  @IsInt()
  noOfBathrooms: number;
}
