import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.reservation, { eager: true })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToOne(() => Room, (room) => room.reservation)
  @JoinColumn({ name: 'idRoom' })
  room: Room;
}
