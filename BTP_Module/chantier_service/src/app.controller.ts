import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChantierService } from './app.service';
import { CreateChantierDto, UpdateChantierDto } from './dto/ChantierDto';

@Controller('chantiers')
export class ChantierController {
  constructor(private readonly chantierService: ChantierService) {}

  @Get()
  async findAll() {
    return this.chantierService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.chantierService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createChantierDto: CreateChantierDto) {
    return this.chantierService.create(createChantierDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChantierDto: UpdateChantierDto,
  ) {
    return this.chantierService.update(id, updateChantierDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.chantierService.delete(id);
  }
}
