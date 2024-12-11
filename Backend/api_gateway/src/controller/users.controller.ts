import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  Request,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { CustomLogger } from '../logging/custom-logger.service';
import { CreateUserDto } from '../dto/users/CreateUser.dto';
import { UpdateUserDto } from '../dto/users/UpdateUser.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new CustomLogger('UsersController');

  constructor(
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const email = req.user.email;
    if (!email) {
      throw new BadRequestException('Email is required in the request');
    }
    this.logger.log(`Fetching all users for email: ${email}`);
    try {
      return await this.userServiceClient
        .send('find_all', { email })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch all users:', error);
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  healthCheck() {
    return { status: 200 };
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('email') email: string) {
    if (!this.validateEmail(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    this.logger.log(`Fetching user with email: ${email}`);
    try {
      return await this.userServiceClient
        .send({ cmd: 'find_one' }, { email })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new HttpException('Failed to fetch user', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (!this.validateEmail(createUserDto.email)) {
      throw new BadRequestException(
        `Invalid email format: ${createUserDto.email}`,
      );
    }
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    try {
      return await this.userServiceClient
        .send({ cmd: 'create' }, createUserDto)
        .toPromise();
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':email')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!this.validateEmail(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    this.logger.log(`Updating user with email: ${email}`);
    try {
      return await this.userServiceClient
        .send({ cmd: 'update' }, { email, data: updateUserDto })
        .toPromise();
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new HttpException('Failed to update user', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':email')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('email') email: string) {
    if (!this.validateEmail(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    this.logger.log(`Deleting user with email: ${email}`);
    try {
      return await this.userServiceClient
        .send({ cmd: 'remove' }, { email })
        .toPromise();
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new HttpException('Failed to delete user', HttpStatus.BAD_REQUEST);
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
