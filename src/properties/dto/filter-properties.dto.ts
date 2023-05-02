import { IsOptional } from 'class-validator';

export default class FilterPropertiesDto {
  @IsOptional()
  userId: string;

  @IsOptional()
  isListed: boolean;
}
