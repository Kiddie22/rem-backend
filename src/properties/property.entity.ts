import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  squareFeet: number;

  @Column()
  noOfBedrooms: number;

  @Column()
  noOfBathrooms: number;

  @ManyToOne((_type) => User, (user) => user.properties, { eager: true })
  user: User;
}
