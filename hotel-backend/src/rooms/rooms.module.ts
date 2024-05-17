import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from 'src/features/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/features/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Reservation])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
