import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: Express.Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.login(
      req.user as Omit<User, 'password'>,
    );
    response.cookie('token', accessToken, { httpOnly: true });
    return;
  }
}
