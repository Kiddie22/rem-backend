import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Controller,
  Patch,
  Query,
} from '@nestjs/common';
import GetUser from 'src/users/get-user.decorator';
import CheckAbilities from 'src/ability/abilities.decorator';
import AbilitiesGuard from 'src/ability/abilities.guard';
import JsonResponse from 'src/utils/json-response-format';
import PropertiesService from './properties.service';
import CreatePropertyDto from './dto/create-property.dto';
import UpdatePropertyDto from './dto/update-property.dto';
import Property from './property.entity';
import FilterPropertiesDto from './dto/filter-properties.dto';

@Controller('properties')
export default class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @GetUser() user: { id: string; username: string },
  ): Promise<Property> {
    const userId = user.id;
    return this.propertiesService.createProperty(createPropertyDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getProperties(
    @Query() filterPropertiesDto: FilterPropertiesDto,
  ): Promise<Property[]> {
    return this.propertiesService.getProperties(filterPropertiesDto);
  }

  @Get(':id')
  @CheckAbilities({ action: 'Read', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async getPropertyById(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.getPropertyById(id);
  }

  @Patch(':id')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async updatePropertyById(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return this.propertiesService.updatePropertyById(id, updatePropertyDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: 'Delete', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async deletePropertyById(@Param('id') id: string): Promise<JsonResponse> {
    await this.propertiesService.deleteProperty(id);
    return { status: 200, message: 'Property deleted' };
  }
}
