import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  propertyName: string;

  @Column()
  propertyType: PropertyType;

  @Column()
  noOfBedrooms: number;

  @Column()
  noOfBathrooms: number;

  @ManyToOne((_type) => User, (user) => user.properties, { eager: true })
  user: User;
}

export enum PropertyType {
  House = 'HOUSE',
  Apartment = 'APARTMENT',
  Mobile = 'MOBILE_HOME',
}
