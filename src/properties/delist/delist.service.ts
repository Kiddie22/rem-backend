import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Property from '../property.entity';
import PropertiesService from '../properties.service';

@Injectable()
export default class DelistService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private propertiesService: PropertiesService,
  ) {}

  async delistProperty(propertyId: string): Promise<void> {
    const property = await this.propertiesService.getPropertyById(propertyId);
    property.isListed = false;
    await this.propertiesRepository.save(property);
  }
}
