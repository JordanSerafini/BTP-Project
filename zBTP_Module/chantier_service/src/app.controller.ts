import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChantierService } from './app.service';
import { CreateChantierDto, UpdateChantierDto } from './dtos/ChantierDto';

@Controller()
export class ChantierController {
  constructor(private readonly chantierService: ChantierService) {}

  @MessagePattern({ cmd: 'findAll' })
  async findAll() {
    return this.chantierService.findAll();
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload() id: string) {
    return this.chantierService.findOne(id);
  }

  @MessagePattern({ cmd: 'create' })
  async create(@Payload() createChantierDto: CreateChantierDto) {
    return this.chantierService.create(createChantierDto);
  }

  @MessagePattern({ cmd: 'update' })
  async update(
    @Payload() payload: { id: string; updateChantierDto: UpdateChantierDto },
  ) {
    const { id, updateChantierDto } = payload;
    return this.chantierService.update(id, updateChantierDto);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(@Payload() id: string) {
    return this.chantierService.delete(id);
  }
}
