import {
  Controller,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async handleLogin(loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'register' })
  async handleRegister(registerDto: {
    username: string;
    firstname: string | null;
    lastname: string | null;
    email: string;
    password: string;
    image: string | null;
    phone: string | null;
    age: number | null;
    address: string | null;
    city: string | null;
    favorites: string | null;
    roles: string;
  }) {
    try {
      const user = await this.authService.register(
        registerDto.username,
        registerDto.firstname,
        registerDto.lastname,
        registerDto.email,
        registerDto.password,
        registerDto.image,
        registerDto.phone,
        registerDto.age,
        registerDto.address,
        registerDto.city,
        registerDto.roles || 'user',
      );
      return user;
    } catch (error) {
      console.error(
        `Registration failed for email: ${registerDto.email}`,
        error.message,
      );
      throw new BadRequestException('Registration failed');
    }
  }

  @MessagePattern({ cmd: 'validate' })
  async handleValidate(tokenDto: { token: string }) {
    try {
      const decodedToken = this.authService.validateToken(tokenDto.token);
      return { valid: true, decodedToken };
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  @MessagePattern({ cmd: 'logout' })
  async handleLogout(logoutDto: { user: { id: string; email: string } }) {
    const { user } = logoutDto;

    if (!user || !user.email || !user.id) {
      throw new InternalServerErrorException('User information is incomplete');
    }

    await this.authService.logout(user);
    return { message: `Logout successful for user with email: ${user.email}` };
  }
}
