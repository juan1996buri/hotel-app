import { HttpStatus, Injectable } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { Reservation } from 'src/features/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}
  async create(dto: ReservationDto) {
    try {
      const data = await this.reservationRepository.save(dto);
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
      const data = await this.reservationRepository
        .createQueryBuilder('re')
        .innerJoinAndSelect('re.user', 'user')
        .innerJoinAndSelect('re.room', 'room')
        .getMany();
      if (data.length > 0) {
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
      const data = await this.reservationRepository.findOneBy({ id });
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

  async update(id: number, dto: ReservationDto) {
    try {
      const { affected } = await this.reservationRepository.update({ id }, dto);
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

  async remove(id: number) {
    try {
      const { affected } = await this.reservationRepository
        .createQueryBuilder()
        .delete()
        .from(Reservation)
        .where('id = :id', { id })
        .execute();

      if (affected > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: ['Dato eliminado con exito'],
          count: affected,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['No se puedo borrar el dato porque no existe'],
          count: 0,
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
