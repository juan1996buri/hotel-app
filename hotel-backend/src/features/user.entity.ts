import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column({ unique: true })
  idCard: string;
  @OneToMany(() => Reservation, (photo) => photo.user)
  reservation: Reservation[];
}
