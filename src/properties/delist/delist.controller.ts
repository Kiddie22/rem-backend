import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AbilitiesGuard from 'src/ability/abilities.guard';
import CheckAbilities from 'src/ability/abilities.decorator';
import Property from '../property.entity';
import DelistService from './delist.service';

@Controller('properties')
export default class DelistController {
  constructor(private readonly delistService: DelistService) {}

  @Patch(':id/delist')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async delistProperty(@Param('id') id: string): Promise<string> {
    await this.delistService.delistProperty(id);
    return 'Property delisted';
  }
}
