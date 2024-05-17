import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomDto } from './dto/room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: RoomDto) {
    return await this.roomsService.create(createRoomDto);
  }

  @Get()
  async findAll() {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roomsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: RoomDto) {
    return await this.roomsService.update(+id, updateRoomDto);
  }
  @Put('finish/:id')
  async finishRent(@Param('id') id: number, @Body() updateRoomDto: RoomDto) {
    return await this.roomsService.finishRent(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roomsService.remove(+id);
  }
}
