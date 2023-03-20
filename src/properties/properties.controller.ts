import { AuthGuard } from '@nestjs/passport';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Post, Controller, Body, UseGuards } from '@nestjs/common';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProperty(@Body() createPropertyDto: CreatePropertyDto): void {
    this.propertiesService.createProperty(createPropertyDto);
  }
}
