import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AbilitiesGuard from 'src/ability/abilities.guard';
import CheckAbilities from 'src/ability/abilities.decorator';
import JsonResponse from 'src/utils/json-response';
import Property from '../property.entity';
import DelistService from './delist.service';

@Controller('properties')
export default class DelistController {
  constructor(private readonly delistService: DelistService) {}

  @Patch(':id/delist')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async delistProperty(@Param('id') id: string): Promise<JsonResponse> {
    await this.delistService.delistProperty(id);
    return new JsonResponse(200, 'Property delisted');
  }
}
