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
    console.log('healthCheck');
    return { status: 'ok', code: 200 };
  }

  // Fournitures
  @Get('fournitures')
  async findAllFournitures() {
    console.log('findAllFournitures');
    return this.multiService.send({ cmd: 'findAllFournitures' }, {});
  }

  @Post('fournitures')
  async createFourniture(@Body() data: any) {
    console.log('createFourniture');
    return this.multiService.send({ cmd: 'createFourniture' }, data);
  }

  @Put('fournitures/:id')
  async updateFourniture(@Param('id') id: string, @Body() data: any) {
    console.log('updateFourniture');
    return this.multiService.send({ cmd: 'updateFourniture' }, { id, data });
  }

  @Delete('fournitures/:id')
  async deleteFourniture(@Param('id') id: string) {
    console.log('deleteFourniture');
    return this.multiService.send({ cmd: 'deleteFourniture' }, id);
  }

  // Outils
  @Get('outils')
  async findAllOutils() {
    console.log('findAllOutils');
    return this.multiService.send({ cmd: 'findAllOutils' }, {});
  }

  @Post('outils')
  async createOutil(@Body() data: any) {
    console.log('createOutil');
    return this.multiService.send({ cmd: 'createOutil' }, data);
  }

  @Put('outils/:id')
  async updateOutil(@Param('id') id: string, @Body() data: any) {
    console.log('updateOutil');
    return this.multiService.send({ cmd: 'updateOutil' }, { id, data });
  }

  @Delete('outils/:id')
  async deleteOutil(@Param('id') id: string) {
    console.log('deleteOutil');
    return this.multiService.send({ cmd: 'deleteOutil' }, id);
  }

  // personnel
  @Get('personnels')
  async findAllpersonnels() {
    console.log('findAllpersonnels');
    return this.multiService.send({ cmd: 'findAllpersonnels' }, {});
  }

  @Post('personnels')
  async createpersonnel(@Body() data: any) {
    console.log('createpersonnel');
    return this.multiService.send({ cmd: 'createpersonnel' }, data);
  }

  @Put('personnels/:id')
  async updatepersonnel(@Param('id') id: string, @Body() data: any) {
    console.log('updatepersonnel');
    return this.multiService.send({ cmd: 'updatepersonnel' }, { id, data });
  }

  @Delete('personnels/:id')
  async deletepersonnel(@Param('id') id: string) {
    console.log('deletepersonnel');
    return this.multiService.send({ cmd: 'deletepersonnel' }, id);
  }
}
