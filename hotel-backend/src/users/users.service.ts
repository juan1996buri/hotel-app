import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/features/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(dto: UserDto) {
    try {
      const data = await this.usersRepository.save(dto);
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
      const data = await this.usersRepository.find();
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
      const data = await this.usersRepository.findOneBy({ id });
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

  async update(id: number, dto: UserDto) {
    try {
      const { affected } = await this.usersRepository.update({ id }, dto);
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
      const { affected } = await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(User)
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
