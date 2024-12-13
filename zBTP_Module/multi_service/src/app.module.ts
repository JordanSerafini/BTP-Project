import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fourniture, FournitureSchema } from './schemas/fourniture.schema';
import { Outils, OutilsSchema } from './schemas/outils.schema';
import { Personel, PersonelSchema } from './schemas/personel.schema';
import { MicroserviceController } from './app.controller';
import { MicroserviceService } from './app.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fourniture.name, schema: FournitureSchema },
      { name: Outils.name, schema: OutilsSchema },
      { name: Personel.name, schema: PersonelSchema },
    ]),
  ],
  controllers: [MicroserviceController],
  providers: [MicroserviceService],
})
export class MultiserviceModule {}
