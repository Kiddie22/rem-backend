import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersService from 'src/users/users.service';
import { Property } from './property.entity';
import CreatePropertyDto from './dto/create-property.dto';

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
  ): Promise<void> {
    const user = await this.usersService.getUserById(userId);
    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      user,
    });
    await this.propertiesRepository.save(property);
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

  async deleteProperty(propertyId: string): Promise<void> {
    const property = await this.getPropertyById(propertyId);
    this.propertiesRepository.remove(property);
  }
}
