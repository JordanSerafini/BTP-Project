import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './app.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('find_all')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('find_one')
  findOne(@Payload() email: string) {
    return this.usersService.findOne(email);
  }

  @MessagePattern('create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('update')
  update(@Payload() payload: { email: string; data: UpdateUserDto }) {
    return this.usersService.update(payload.email, payload.data);
  }

  @MessagePattern('remove')
  remove(@Payload() email: string) {
    return this.usersService.remove(email);
  }
}
