import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.users({});
  }

  @Put(':id')
  async update(
    @Param() params: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser({
      where: { id: params.id },
      data: updateUserDto,
    });
  }
}
