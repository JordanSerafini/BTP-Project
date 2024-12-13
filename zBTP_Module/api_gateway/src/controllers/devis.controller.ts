import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDevisDto, UpdateDevisDto } from 'src/dtos/devis.dto';

@Controller('devis')
export class DevisController {
  constructor(
    @Inject('DEVIS_SERVICE') private readonly devisService: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return this.devisService.send({ cmd: 'findAllDevis' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.devisService.send({ cmd: 'findOneDevis' }, id);
  }

  @Post()
  async create(@Body() createDevisDto: CreateDevisDto) {
    return this.devisService.send({ cmd: 'createDevis' }, createDevisDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDevisDto: UpdateDevisDto,
  ) {
    return this.devisService.send(
      { cmd: 'updateDevis' },
      { id, updateDevisDto },
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.devisService.send({ cmd: 'deleteDevis' }, id);
  }
}
