import { Module } from '@nestjs/common';
import PropertiesModule from 'src/properties/properties.module';
import UsersModule from 'src/users/users.module';
import AbilityFactory from './ability.factory/ability.factory';

@Module({
  imports: [PropertiesModule, UsersModule],
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export default class AbilityModule {}
