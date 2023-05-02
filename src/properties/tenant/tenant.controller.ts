import { Controller, Patch, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AbilitiesGuard from 'src/ability/abilities.guard';
import CheckAbilities from 'src/ability/abilities.decorator';
import Property from '../property.entity';
import TenantService from './tenant.service';
import UpdateTenantDto from './dto/update-tenant.dto';

@Controller('properties/:id/tenant')
export default class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Patch('/add')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async addTenant(
    @Param('id') propertyId: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<Property> {
    const property = await this.tenantService.addTenant(
      propertyId,
      updateTenantDto,
    );
    return property;
  }

  @Patch('/remove')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async removeTenant(@Param('id') propertyId: string): Promise<Property> {
    const property = await this.tenantService.removeTenant(propertyId);
    return property;
  }
}
