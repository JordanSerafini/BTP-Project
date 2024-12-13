import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreateChantierDto, UpdateChantierDto } from 'src/dtos/ChantierDto';

@Controller('chantiers')
export class ChantierController {
  constructor(
    @Inject('CHANTIER_SERVICE') private readonly chantierService: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return this.chantierService.send({ cmd: 'findAll' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.chantierService.send({ cmd: 'findOne' }, id);
  }

  @Post()
  async create(@Body() createChantierDto: CreateChantierDto) {
    return this.chantierService.send({ cmd: 'create' }, createChantierDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChantierDto: UpdateChantierDto,
  ) {
    return this.chantierService.send(
      { cmd: 'update' },
      { id, updateChantierDto },
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.chantierService.send({ cmd: 'delete' }, id);
  }
}
