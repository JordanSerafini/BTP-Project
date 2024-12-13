import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ChantierController } from './app.controller';
import { ChantierService } from './app.service';
import { Chantier, ChantierSchema } from './schema/Chantier.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Chantier.name, schema: ChantierSchema },
    ]),
  ],
  controllers: [ChantierController],
  providers: [ChantierService],
})
export class ChantierModule {}
