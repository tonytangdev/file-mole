import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt-auth-guard';

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

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.signup(signupDto);

    response.cookie('token', accessToken, { httpOnly: true });
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    return;
  }
}
