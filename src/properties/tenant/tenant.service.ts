import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UsersService from 'src/users/users.service';
import UpdateTenantDto from './dto/update-tenant.dto';
import Property from '../property.entity';
import PropertiesService from '../properties.service';

@Injectable()
export default class TenantService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private propertiesService: PropertiesService,
    private usersService: UsersService,
  ) {}

  async addTenant(
    propertyId: string,
    updateTenantDto: UpdateTenantDto,
  ): Promise<Property> {
    const { userId } = updateTenantDto;
    const user = await this.usersService.getUserById(userId);
    const property = await this.propertiesService.getPropertyById(propertyId);
    if (property.tenant) {
      throw new MethodNotAllowedException(
        'Cannot add a tenant while a tenant already exists',
      );
    }
    property.tenant = user;
    await this.propertiesRepository.save(property);
    return property;
  }

  async removeTenant(propertyId: string): Promise<Property> {
    const property = await this.propertiesService.getPropertyById(propertyId);
    property.tenant = null;
    await this.propertiesRepository.save(property);
    return property;
  }
}
