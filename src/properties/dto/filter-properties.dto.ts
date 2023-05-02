import { IsOptional } from 'class-validator';

export default class FilterPropertiesDto {
  @IsOptional()
  ownerId: string;

  @IsOptional()
  isListed: boolean;
}
