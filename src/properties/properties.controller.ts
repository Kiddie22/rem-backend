import { AuthGuard } from '@nestjs/passport';
import { Post, Controller, Body, UseGuards } from '@nestjs/common';
import PropertiesService from './properties.service';
import CreatePropertyDto from './dto/create-property.dto';

@Controller('properties')
export default class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProperty(@Body() createPropertyDto: CreatePropertyDto): void {
    this.propertiesService.createProperty(createPropertyDto);
  }
}
