import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.users({});
  }

  @UseGuards(JwtAuthGuard)
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
