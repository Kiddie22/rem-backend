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

  @Column({ type: 'real' })
  squareFeet: number;

  @Column({ type: 'smallint' })
  noOfBedrooms: number;

  @Column({ type: 'smallint' })
  noOfBathrooms: number;

  @Column()
  isListed: boolean;

  @ManyToOne((_type) => User, (user) => user.properties, { eager: true })
  user: User;
}
