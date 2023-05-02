import { Repository, SelectQueryBuilder } from 'typeorm';
import Property from '../property.entity';
import FilterPropertiesDto from '../dto/filter-properties.dto';

export default function createPropertyQB(
  propertiesRepository: Repository<Property>,
  filterPropertiesDto: FilterPropertiesDto,
): SelectQueryBuilder<Property> {
  const qb = propertiesRepository.createQueryBuilder('property');
  const { userId, isListed } = filterPropertiesDto;

  if (userId) {
    qb.andWhere('property.user.id = :userId', { userId });
  }

  if (isListed) {
    qb.andWhere('property.isListed = :isListed', { isListed });
  }

  return qb;
}
