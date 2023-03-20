import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export enum PropertyType {
  House = 'HOUSE',
  Apartment = 'APARTMENT',
  Mobile = 'MOBILE_HOME',
}
