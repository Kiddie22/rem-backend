import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PropertyType } from '../property.entity';

export default class UpdatePropertyDto {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  propertyName: string;

  @IsEnum(PropertyType)
  @IsOptional()
  propertyType: PropertyType;

  @IsInt()
  @IsOptional()
  noOfBedrooms: number;

  @IsInt()
  @IsOptional()
  noOfBathrooms: number;
}
