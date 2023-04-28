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
} from '@nestjs/common';
import GetUser from 'src/users/get-user.decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import CheckAbilities from 'src/ability/abilities.decorator';
import AbilitiesGuard from 'src/ability/abilities.guard';
import PropertiesService from './properties.service';
import CreatePropertyDto from './dto/create-property.dto';
import UpdatePropertyDto from './dto/update-property.dto';
import Property from './property.entity';

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
  async getUsersProperties(@GetUser() user: JwtPayload): Promise<Property[]> {
    return this.propertiesService.getUsersProperties(user.id);
  }

  @Get('listed')
  @UseGuards(AuthGuard('jwt'))
  async getListedProperties(): Promise<Property[]> {
    return this.propertiesService.getListedProperties();
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

  @Patch('list/:id')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async listProperty(@Param('id') id: string): Promise<string> {
    await this.propertiesService.listProperty(id);
    return 'Property listed';
  }

  @Patch('delist/:id')
  @CheckAbilities({ action: 'Update', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async delistProperty(@Param('id') id: string): Promise<string> {
    await this.propertiesService.delistProperty(id);
    return 'Property delisted';
  }

  @Delete(':id')
  @CheckAbilities({ action: 'Delete', subject: Property })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async deletePropertyById(@Param('id') id: string): Promise<string> {
    await this.propertiesService.deleteProperty(id);
    return 'Property Deleted';
  }
}
