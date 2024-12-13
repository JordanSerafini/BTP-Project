import { Module } from '@nestjs/common';
import { DevisController } from './app.controller';
import { DevisService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Devis, DevisSchema } from './schemas/devis.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Devis.name, schema: DevisSchema }]),
  ],
  controllers: [DevisController],
  providers: [DevisService],
})
export class ChantierModule {}
