import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from 'src/auth/auth.module';
import { Property } from './property.entity';
import PropertiesService from './properties.service';
import PropertiesController from './properties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), AuthModule],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export default class PropertiesModule {}
