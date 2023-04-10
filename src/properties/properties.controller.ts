import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles/roles.decorator';
import Role from 'src/auth/roles/role-type';
import RolesGuard from 'src/auth/roles/guards/roles.guard';
import GetUser from 'src/users/get-user.decorator';
import IsOwnerGuard from 'src/auth/roles/guards/owner.guards';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import PropertiesService from './properties.service';
import CreatePropertyDto from './dto/create-property.dto';
import { Property } from './property.entity';

@Controller('properties')
export default class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @GetUser() user: { id: string; username: string; role: Role },
  ): string {
    const userId = user.id;
    this.propertiesService.createProperty(createPropertyDto, userId);
    return 'Property Created';
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
  async getPropertyById(@Param() params): Promise<Property> {
    const { id } = params;
    return this.propertiesService.getPropertyById(id);
  }

  @Delete(':id')
  @Roles('owner')
  @UseGuards(AuthGuard('jwt'), RolesGuard, IsOwnerGuard)
  async deletePropertyById(@Param() params): Promise<string> {
    const { id } = params;
    await this.propertiesService.deleteProperty(id);
    return 'Property Deleted';
  }
}
