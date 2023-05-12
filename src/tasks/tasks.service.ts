import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PropertiesService from 'src/properties/properties.service';
import CreateTaskDto from './dto/create-task.dto';
import Task from './entities/task.entity';

@Injectable()
export default class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private propertiesService: PropertiesService,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    propertyId: string,
  ): Promise<Task> {
    const property = await this.propertiesService.getPropertyById(propertyId);
    const task = this.tasksRepository.create({
      ...createTaskDto,
      isCompleted: false,
      property,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  async getAllTasks(propertyId: string): Promise<Task[]> {
    const property = await this.propertiesService.getPropertyById(propertyId);
    const tasks: Task[] = await this.tasksRepository.findBy({ property });
    return tasks;
  }

  async getTaskById(taskId: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOneBy({
        taskId,
      });
      if (!task) throw new NotFoundException();
      return task;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async markTaskComplete(taskId: string): Promise<void> {
    const task = await this.getTaskById(taskId);
    task.isCompleted = true;
    await this.tasksRepository.save(task);
  }
}
