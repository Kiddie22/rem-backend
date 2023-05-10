import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import CheckAbilities from 'src/ability/abilities.decorator';
import AbilitiesGuard from 'src/ability/abilities.guard';
import { AuthGuard } from '@nestjs/passport';
import JsonResponse from 'src/utils/json-response';
import TasksService from './tasks.service';
import CreateTaskDto from './dto/create-task.dto';
import Task from './entities/task.entity';

@Controller('properties/:id/tasks')
export default class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @CheckAbilities({ action: 'Create', subject: Task })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('id') propertyId: string,
  ): Promise<JsonResponse> {
    const task = await this.tasksService.createTask(createTaskDto, propertyId);
    return new JsonResponse(201, 'New task created', task);
  }

  @Get()
  @CheckAbilities({ action: 'Read', subject: Task })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async getAllTasks(@Param('id') propertyId: string): Promise<JsonResponse> {
    const tasks = await this.tasksService.getAllTasks(propertyId);
    return new JsonResponse(200, 'Fetched all tasks of property', tasks);
  }

  @Post(':taskId')
  @CheckAbilities({ action: 'Update', subject: Task })
  @UseGuards(AuthGuard('jwt'), AbilitiesGuard)
  async markTaskComplete(
    @Param('taskId') taskId: string,
  ): Promise<JsonResponse> {
    await this.tasksService.markTaskComplete(taskId);
    return new JsonResponse(200, 'Task marked complete');
  }
}
