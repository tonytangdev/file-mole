import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(2)
  name?: string;

  @IsString()
  @MinLength(8)
  password?: string;
}
