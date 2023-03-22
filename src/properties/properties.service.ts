import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import CreatePropertyDto from './dto/create-property.dto';

@Injectable()
export default class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async createProperty(createPropertyDto: CreatePropertyDto): Promise<void> {
    const { propertyName, propertyType, noOfBedrooms, noOfBathrooms } =
      createPropertyDto;
    const property = this.propertiesRepository.create({
      propertyName,
      propertyType,
      noOfBedrooms,
      noOfBathrooms,
    });
    await this.propertiesRepository.save(property);
  }
}
