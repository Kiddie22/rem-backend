import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersService from 'src/users/users.service';
import CreatePropertyDto from './dto/create-property.dto';
import UpdatePropertyDto from './dto/update-property.dto';
import Property from './property.entity';

@Injectable()
export default class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private usersService: UsersService,
  ) {}

  async createProperty(
    createPropertyDto: CreatePropertyDto,
    userId: string,
  ): Promise<Property> {
    const user = await this.usersService.getUserById(userId);
    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      user,
      isListed: false,
    });
    await this.propertiesRepository.save(property);
    return property;
  }

  async getUsersProperties(userId: string): Promise<Property[]> {
    const user = await this.usersService.getUserById(userId);
    return this.propertiesRepository.findBy({ user });
  }

  async getListedProperties(): Promise<Property[]> {
    const properties = await this.propertiesRepository.findBy({
      isListed: true,
    });
    return properties;
  }

  async getPropertyById(propertyId: string): Promise<Property> {
    try {
      const property = await this.propertiesRepository.findOneBy({
        id: propertyId,
      });
      if (!property) throw new NotFoundException();
      return property;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updatePropertyById(
    propertyId: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.getPropertyById(propertyId);
    const updatedProperty = { ...property, ...updatePropertyDto };
    await this.propertiesRepository.save(updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(propertyId: string): Promise<void> {
    const property = await this.getPropertyById(propertyId);
    this.propertiesRepository.remove(property);
  }

  async delistProperty(propertyId: string): Promise<void> {
    const property = await this.getPropertyById(propertyId);
    property.isListed = false;
    await this.propertiesRepository.save(property);
  }
}
