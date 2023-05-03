import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AbilitiesGuard from 'src/ability/abilities.guard';
import CheckAbilities from 'src/ability/abilities.decorator';
import JsonResponse from 'src/utils/json-response-format';
import Property from '../property.entity';
import ListService from './list.service';

@Controller('properties')
export default class ListController {
  constructor(private readonly listService: ListService) {}

  @Patch(':id/list')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async listProperty(@Param('id') id: string): Promise<JsonResponse> {
    await this.listService.listProperty(id);
    return { status: 200, message: 'Property listed' };
  }
}
