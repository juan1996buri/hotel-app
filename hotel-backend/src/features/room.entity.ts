import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity({ name: 'room' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  roomNumber: number;
  @Column()
  status: string;

  @OneToOne(() => Reservation, (reservation) => reservation.room, {
    eager: true,
  })
  @JoinColumn()
  reservation: Reservation;
}
