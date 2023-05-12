import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PropertiesModule from 'src/properties/properties.module';
import TasksService from './tasks.service';
import TasksController from './tasks.controller';
import Task from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), PropertiesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export default class TasksModule {}
