import { HttpStatus, Injectable } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/features/room.entity';
import { Repository } from 'typeorm';
import { Reservation } from 'src/features/reservation.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}
  async create(dto: RoomDto) {
    try {
      const data = await this.roomsRepository.save({
        ...dto,
        reservation: null,
        status: dto.status,
      });
      return {
        statusCode: HttpStatus.OK,
        message: ['Dato creado con exito'],
        data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.message],
      };
    }
  }

  async findAll() {
    try {
      const data = await this.roomsRepository.find();

      if (data) {
        return {
          statusCode: HttpStatus.OK,
          message: ['Datos obtenidos'],
          data,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['No existen datos'],
          data,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.message],
      };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.roomsRepository.findOneBy({ id });
      return {
        statusCode: HttpStatus.OK,
        message: ['Dato creado con exito'],
        data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.message],
      };
    }
  }

  async update(id: number, dto: RoomDto) {
    try {
      console.log(dto);

      if (dto?.idReservation === undefined) {
        if (dto.idUser !== 0) {
          const response = await this.reservationRepository.save({
            createDate: new Date(),
            user: { id: dto?.idUser },
            room: { id: dto?.idRoom },
            endDate: null,
          });
          await this.roomsRepository.save({
            status: dto.status,
            reservation: { id: response.id },
            roomNumber: dto.roomNumber,
            id: dto.idRoom,
          });
          return {
            statusCode: HttpStatus.OK,
            message: ['Dato creado con exito'],
            data: response,
          };
        } else {
          await this.roomsRepository.update(
            { id },
            { status: dto.status, roomNumber: dto.roomNumber },
          );
          return {
            statusCode: HttpStatus.OK,
            message: ['Dato actualizado con exito'],
          };
        }
      } else {
        await this.roomsRepository.update(
          { id },
          { status: dto.status, roomNumber: dto.roomNumber },
        );
        const { affected } = await this.reservationRepository.update(
          { id: dto.idReservation },
          { user: { id: dto.idUser } },
        );
        if (affected > 0) {
          return {
            statusCode: HttpStatus.OK,
            message: ['Dato actualizado con exito'],
            count: affected,
          };
        } else {
          return {
            statusCode: HttpStatus.NOT_FOUND,
            message: ['No se encontro el dato'],
            count: affected,
          };
        }
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.message],
      };
    }
  }

  async remove(id: number) {
    try {
      const data = await this.roomsRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Dato removido',
        data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.message],
      };
    }
  }

  async finishRent(id: number, dto: RoomDto) {
    try {
      console.log(dto);
      await this.reservationRepository.update(
        { id: dto.idReservation },
        { endDate: new Date() },
      );
      const { affected } = await this.roomsRepository.update(
        { id },
        { reservation: null, status: dto.status },
      );
      if (affected > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: ['Dato actualizado con exito'],
          count: affected,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['No se encontro el dato'],
          count: affected,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error?.message],
      };
    }
  }
}
