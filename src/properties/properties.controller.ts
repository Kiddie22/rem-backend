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
import { Roles } from 'src/auth/roles/roles.decorator';
import Role from 'src/auth/roles/role-type';
import RolesGuard from 'src/auth/roles/guards/roles.guard';
import GetUser from 'src/users/get-user.decorator';
import IsOwnerGuard from 'src/auth/roles/guards/owner.guards';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import PropertiesService from './properties.service';
import CreatePropertyDto from './dto/create-property.dto';
import UpdatePropertyDto from './dto/update-property.dto';
import Property from './property.entity';

@Controller('properties')
export default class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @GetUser() user: { id: string; username: string; role: Role },
  ): Promise<Property> {
    const userId = user.id;
    return this.propertiesService.createProperty(createPropertyDto, userId);
  }

  @Get()
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUsersProperties(@GetUser() user: JwtPayload): Promise<Property[]> {
    return this.propertiesService.getUsersProperties(user.id);
  }

  @Get(':id')
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard, IsOwnerGuard)
  async getPropertyById(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.getPropertyById(id);
  }

  @Patch(':id')
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard, IsOwnerGuard)
  async updatePropertyById(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return this.propertiesService.updatePropertyById(id, updatePropertyDto);
  }

  @Delete(':id')
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard, IsOwnerGuard)
  async deletePropertyById(@Param('id') id: string): Promise<string> {
    await this.propertiesService.deleteProperty(id);
    return 'Property Deleted';
  }
}
