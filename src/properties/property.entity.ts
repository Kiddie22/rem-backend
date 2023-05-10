import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Task from 'src/tasks/entities/task.entity';
import { PropertyType } from './property-type';

@Entity()
export default class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  propertyName: string;

  @Column()
  propertyType: PropertyType;

  @Column()
  location: string;

  @Column({ type: 'real' })
  squareFeet: number;

  @Column({ type: 'smallint' })
  noOfBedrooms: number;

  @Column({ type: 'smallint' })
  noOfBathrooms: number;

  @Column()
  isListed: boolean;

  @ManyToOne((_type) => User, (user) => user.ownedProperties, { eager: true })
  owner: User;

  @ManyToOne((_type) => User, (user) => user.rentedProperties, { eager: true })
  tenant: User;

  @OneToMany((_type) => Task, (task) => task.property, { eager: true })
  tasks: Task[];
}
