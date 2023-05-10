import { Exclude } from 'class-transformer';
import Property from 'src/properties/property.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany((_type) => Property, (property) => property.owner, {
    eager: false,
  })
  ownedProperties: Property[];

  @OneToMany((_type) => Property, (property) => property.tenant, {
    eager: false,
  })
  rentedProperties: Property[];
}
