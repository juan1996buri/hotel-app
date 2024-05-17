import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() dto: ReservationDto) {
    return await this.reservationService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.reservationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: ReservationDto) {
    return this.reservationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
