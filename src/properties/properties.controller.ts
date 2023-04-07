import { AuthGuard } from '@nestjs/passport';
import { Post, Controller, Body, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles/roles.decorator';
import Role from 'src/auth/roles/enums/role.enum';
import RolesGuard from 'src/auth/roles/guards/roles.guard';
import PropertiesService from './properties.service';
import CreatePropertyDto from './dto/create-property.dto';

@Controller('properties')
export default class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  @Roles(Role.Owner)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createProperty(@Body() createPropertyDto: CreatePropertyDto): string {
    this.propertiesService.createProperty(createPropertyDto);
    return 'Property Created';
  }
}
