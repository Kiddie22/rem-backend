import { PropertyType } from '../property.entity';
import { IsEnum, IsInt, IsString, MaxLength } from 'class-validator';

export class CreatePropertyDto {
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
