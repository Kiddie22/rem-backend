import { IsString, MaxLength } from 'class-validator';

export default class CreateTaskDto {
  @IsString()
  @MaxLength(255)
  taskTitle: string;

  @IsString()
  @MaxLength(255)
  taskDetails: string;
}
