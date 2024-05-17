import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  idCard: string;
  @IsString()
  username: string;
}
