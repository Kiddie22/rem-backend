import Property from 'src/properties/property.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  taskId: string;

  @Column()
  taskTitle: string;

  @Column()
  taskDetails: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne((_type) => Property, (property) => property.tasks, {
    eager: false,
  })
  property: Property;
}
