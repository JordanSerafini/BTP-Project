import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChantierController } from './controllers/chantier.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHANTIER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'chantier_service',
          port: 4444,
        },
      },
    ]),
  ],
  controllers: [ChantierController],
  providers: [],
})
export class AppModule {}
