import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroserviceService } from './app.service';
import {
  CreateFournitureDto,
  UpdateFournitureDto,
} from './dtos/fourniture.dto';
import { CreateOutilsDto, UpdateOutilsDto } from './dtos/outils.dto';
import { CreatePersonelDto, UpdatePersonelDto } from './dtos/personel.dto';

@Controller()
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  // Fourniture
  @MessagePattern({ cmd: 'findAllFournitures' })
  async findAllFournitures() {
    return this.microserviceService.findAllFournitures();
  }

  @MessagePattern({ cmd: 'createFourniture' })
  async createFourniture(@Payload() data: CreateFournitureDto) {
    return this.microserviceService.createFourniture(data);
  }

  @MessagePattern({ cmd: 'updateFourniture' })
  async updateFourniture(
    @Payload() { id, data }: { id: string; data: UpdateFournitureDto },
  ) {
    return this.microserviceService.updateFourniture(id, data);
  }

  @MessagePattern({ cmd: 'deleteFourniture' })
  async deleteFourniture(@Payload() id: string) {
    return this.microserviceService.deleteFourniture(id);
  }

  // Outils
  @MessagePattern({ cmd: 'findAllOutils' })
  async findAllOutils() {
    return this.microserviceService.findAllOutils();
  }

  @MessagePattern({ cmd: 'createOutil' })
  async createOutil(@Payload() data: CreateOutilsDto) {
    return this.microserviceService.createOutil(data);
  }

  @MessagePattern({ cmd: 'updateOutil' })
  async updateOutil(
    @Payload() { id, data }: { id: string; data: UpdateOutilsDto },
  ) {
    return this.microserviceService.updateOutil(id, data);
  }

  @MessagePattern({ cmd: 'deleteOutil' })
  async deleteOutil(@Payload() id: string) {
    return this.microserviceService.deleteOutil(id);
  }

  // Personel
  @MessagePattern({ cmd: 'findAllPersonels' })
  async findAllPersonels() {
    return this.microserviceService.findAllPersonels();
  }

  @MessagePattern({ cmd: 'createPersonel' })
  async createPersonel(@Payload() data: CreatePersonelDto) {
    return this.microserviceService.createPersonel(data);
  }

  @MessagePattern({ cmd: 'updatePersonel' })
  async updatePersonel(
    @Payload() { id, data }: { id: string; data: UpdatePersonelDto },
  ) {
    return this.microserviceService.updatePersonel(id, data);
  }

  @MessagePattern({ cmd: 'deletePersonel' })
  async deletePersonel(@Payload() id: string) {
    return this.microserviceService.deletePersonel(id);
  }
}
