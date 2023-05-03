import { Repository, SelectQueryBuilder } from 'typeorm';
import Property from '../property.entity';
import FilterPropertiesDto from '../dto/filter-properties.dto';

export default function createPropertyQB(
  propertiesRepository: Repository<Property>,
  filterPropertiesDto: FilterPropertiesDto,
): SelectQueryBuilder<Property> {
  const queryBuilder = propertiesRepository.createQueryBuilder('property');
  const { ownerId, isListed } = filterPropertiesDto;

  if (ownerId) {
    queryBuilder.andWhere('property.owner.id = :ownerId', { ownerId });
  }

  if (isListed) {
    queryBuilder.andWhere('property.isListed = :isListed', { isListed });
  }

  return queryBuilder;
}
