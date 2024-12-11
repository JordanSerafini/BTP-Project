import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Get,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('')
export class AuthController {
  constructor(
    @Inject('AUTHENTIFICATION_SERVICE')
    private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      return await this.authServiceClient
        .send({ cmd: 'login' }, loginDto)
        .toPromise();
    } catch (error) {
      console.error('Login failed:', error);
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async register(
    @Body()
    registerDto: {
      email: string;
      password: string;
      nom: string;
      prenom: string;
      role: string;
    },
  ) {
    try {
      return await this.authServiceClient
        .send({ cmd: 'register' }, registerDto)
        .toPromise();
    } catch (error) {
      console.error('Registration failed:', error);
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  async logout(@Body() logoutDto: { user: { id: string; email: string } }) {
    try {
      return await this.authServiceClient
        .send({ cmd: 'logout' }, logoutDto)
        .toPromise();
    } catch (error) {
      console.error('Logout failed:', error);
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  healthCheck() {
    return { status: 200 };
  }
}
