import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TenantService from './tenant.service';
import TenantController from './tenant.controller';
import Property from '../property.entity';
import PropertiesModule from '../properties.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), PropertiesModule],
  controllers: [TenantController],
  providers: [TenantService],
})
export default class TenantModule {}
