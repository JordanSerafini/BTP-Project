import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DevisService } from './app.service';
import { CreateDevisDto, UpdateDevisDto } from './dto/devis.dto';

@Controller()
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  @MessagePattern({ cmd: 'findAllDevis' })
  async findAll() {
    return this.devisService.findAll();
  }

  @MessagePattern({ cmd: 'findOneDevis' })
  async findOne(@Payload() id: string) {
    return this.devisService.findOne(id);
  }

  @MessagePattern({ cmd: 'createDevis' })
  async create(@Payload() createDevisDto: CreateDevisDto) {
    return this.devisService.create(createDevisDto);
  }

  @MessagePattern({ cmd: 'updateDevis' })
  async update(
    @Payload() payload: { id: string; updateDevisDto: UpdateDevisDto },
  ) {
    const { id, updateDevisDto } = payload;
    return this.devisService.update(id, updateDevisDto);
  }

  @MessagePattern({ cmd: 'deleteDevis' })
  async delete(@Payload() id: string) {
    return this.devisService.delete(id);
  }
}
