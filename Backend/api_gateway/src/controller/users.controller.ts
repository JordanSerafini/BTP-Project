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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { CustomLogger } from '../logging/custom-logger.service';

import { CreateUserDto } from '../dto/users/CreateUser.dto';
import { UpdateUserDto } from '../dto/users/UpdateUser.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new CustomLogger('UsersController');

  constructor(
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  async findAll(@Request() req) {
    const email = req.user.email;
    if (!email) {
      throw new BadRequestException('Email is required in the request');
    }
    this.logger.log(`Fetching all users for email: ${email}`);
    return this.userServiceClient.send({ cmd: 'find_all' }, { email });
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    if (!this.validateEmail(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    this.logger.log(`Fetching user with email: ${email}`);
    return this.userServiceClient.send({ cmd: 'find_one' }, { email });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (!this.validateEmail(createUserDto.email)) {
      throw new BadRequestException(
        `Invalid email format: ${createUserDto.email}`,
      );
    }
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    return this.userServiceClient.send({ cmd: 'create' }, createUserDto);
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!this.validateEmail(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    this.logger.log(`Updating user with email: ${email}`);
    return this.userServiceClient.send(
      { cmd: 'update' },
      { email, data: updateUserDto },
    );
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    if (!this.validateEmail(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    this.logger.log(`Deleting user with email: ${email}`);
    return this.userServiceClient.send({ cmd: 'remove' }, { email });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
