import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(params: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const { email, password } = params;
    const user = await this.usersService.user({
      email: email,
      password: password,
    });
    return user;
  }

  async login(user: { email: string; id: string }) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
