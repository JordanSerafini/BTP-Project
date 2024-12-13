import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('')
export class multiServiceController {
  constructor(
    @Inject('MULTI_SERVICE') private readonly multiService: ClientProxy,
  ) {}

  //Health Check
  @Get('health')
  healthCheck() {
    return { status: 'ok', code: 200 };
  }

  // Fournitures
  @Get('fournitures')
  async findAllFournitures() {
    return this.multiService.send({ cmd: 'findAllFournitures' }, {});
  }

  @Post('fournitures')
  async createFourniture(@Body() data: any) {
    return this.multiService.send({ cmd: 'createFourniture' }, data);
  }

  @Put('fournitures/:id')
  async updateFourniture(@Param('id') id: string, @Body() data: any) {
    return this.multiService.send({ cmd: 'updateFourniture' }, { id, data });
  }

  @Delete('fournitures/:id')
  async deleteFourniture(@Param('id') id: string) {
    return this.multiService.send({ cmd: 'deleteFourniture' }, id);
  }

  // Outils
  @Get('outils')
  async findAllOutils() {
    return this.multiService.send({ cmd: 'findAllOutils' }, {});
  }

  @Post('outils')
  async createOutil(@Body() data: any) {
    return this.multiService.send({ cmd: 'createOutil' }, data);
  }

  @Put('outils/:id')
  async updateOutil(@Param('id') id: string, @Body() data: any) {
    return this.multiService.send({ cmd: 'updateOutil' }, { id, data });
  }

  @Delete('outils/:id')
  async deleteOutil(@Param('id') id: string) {
    return this.multiService.send({ cmd: 'deleteOutil' }, id);
  }

  // Personel
  @Get('personels')
  async findAllPersonels() {
    return this.multiService.send({ cmd: 'findAllPersonels' }, {});
  }

  @Post('personels')
  async createPersonel(@Body() data: any) {
    return this.multiService.send({ cmd: 'createPersonel' }, data);
  }

  @Put('personels/:id')
  async updatePersonel(@Param('id') id: string, @Body() data: any) {
    return this.multiService.send({ cmd: 'updatePersonel' }, { id, data });
  }

  @Delete('personels/:id')
  async deletePersonel(@Param('id') id: string) {
    return this.multiService.send({ cmd: 'deletePersonel' }, id);
  }
}
