import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroserviceService } from './app.service';
import {
  CreateFournitureDto,
  UpdateFournitureDto,
} from './dtos/fourniture.dto';
import { CreateOutilsDto, UpdateOutilsDto } from './dtos/outils.dto';
import { CreatePersonnelDto, UpdatePersonnelDto } from './dtos/personnel.dto';

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

  // Personnel
  @MessagePattern({ cmd: 'findAllpersonnels' })
  async findAllPersonnels() {
    return this.microserviceService.findAllPersonnels();
  }

  @MessagePattern({ cmd: 'createpersonnel' })
  async createPersonnel(@Payload() data: CreatePersonnelDto) {
    return this.microserviceService.createPersonnel(data);
  }

  @MessagePattern({ cmd: 'updatepersonnel' })
  async updatePersonnel(
    @Payload() { id, data }: { id: string; data: UpdatePersonnelDto },
  ) {
    return this.microserviceService.updatePersonnel(id, data);
  }

  @MessagePattern({ cmd: 'deletepersonnel' })
  async deletePersonnel(@Payload() id: string) {
    return this.microserviceService.deletePersonnel(id);
  }
}
