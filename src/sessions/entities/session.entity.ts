import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Session {
  @PrimaryGeneratedColumn('uuid')
  sessionId: string;

  @Column()
  userId: string;

  @Column('bigint')
  createdAt = Date.now();

  @Column('bigint')
  expiredAt = Date.now() + 300000;

  @Column()
  isValid: boolean;
}
