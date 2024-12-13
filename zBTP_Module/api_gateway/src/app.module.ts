import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChantierController } from './controllers/chantier.controller';
import { DevisController } from './controllers/devis.controller';
import { multiServiceController } from './controllers/multi_service.controller';

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
      {
        name: 'DEVIS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'devis_service',
          port: 4445,
        },
      },
      {
        name: 'MULTI_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'multi_service',
          port: 4446,
        },
      },
    ]),
  ],
  controllers: [ChantierController, DevisController, multiServiceController],
  providers: [],
})
export class AppModule {}
