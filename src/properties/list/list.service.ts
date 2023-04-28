import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Property from '../property.entity';
import PropertiesService from '../properties.service';

@Injectable()
export default class ListService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private propertiesService: PropertiesService,
  ) {}

  async listProperty(propertyId: string): Promise<void> {
    const property = await this.propertiesService.getPropertyById(propertyId);
    property.isListed = true;
    await this.propertiesRepository.save(property);
  }
}
