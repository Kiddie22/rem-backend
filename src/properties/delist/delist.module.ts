import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DelistService from './delist.service';
import DelistController from './delist.controller';
import Property from '../property.entity';
import PropertiesModule from '../properties.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), PropertiesModule],
  controllers: [DelistController],
  providers: [DelistService],
})
export default class DelistModule {}
