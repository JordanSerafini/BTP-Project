import { Module } from '@nestjs/common';
import { MicroserviceController } from './app.controller';
import { MicroserviceService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Fourniture, FournitureSchema } from './schemas/fourniture.schema';
import { Outils, OutilsSchema } from './schemas/outils.schema';
import { Personnel, PersonnelSchema } from './schemas/personnel.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Fourniture.name, schema: FournitureSchema },
    ]),
    MongooseModule.forFeature([{ name: Outils.name, schema: OutilsSchema }]),
    MongooseModule.forFeature([
      { name: Personnel.name, schema: PersonnelSchema },
    ]),
  ],
  controllers: [MicroserviceController],
  providers: [MicroserviceService],
})
export class MultiserviceModule {}
