import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: UserDto) {
    return await this.usersService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usersService.remove(id);
  }
}
