import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationModule } from './reservation/reservation.module';
import { Room } from './features/room.entity';
import { User } from './features/user.entity';
import { Reservation } from './features/reservation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Room, User, Reservation],
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    ReservationModule,
  ],
})
export class AppModule {}
