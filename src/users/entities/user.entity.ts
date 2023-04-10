import { Exclude } from 'class-transformer';
import Role from 'src/auth/roles/role-type';
import { Property } from 'src/properties/property.entity';
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

  @Column()
  role: Role;

  @OneToMany((_type) => Property, (property) => property.user, { eager: false })
  properties: Property[];
}
