import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { StatusRoom } from './status.enum';

export class RoomDto {
  @IsNumber()
  roomNumber: number;

  @IsEnum(StatusRoom)
  status: string;

  @IsOptional()
  @IsNumber()
  idUser: number;

  @IsNumber()
  @IsOptional()
  idRoom: number;

  @IsNumber()
  @IsOptional()
  idReservation: number;
}
