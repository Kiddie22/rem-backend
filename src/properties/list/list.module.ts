import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from 'src/auth/auth.module';
import UsersModule from 'src/users/users.module';
import ListService from './list.service';
import ListController from './list.controller';
import PropertiesModule from '../properties.module';
import Property from '../property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    PropertiesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ListController],
  providers: [ListService],
})
export default class ListModule {}
