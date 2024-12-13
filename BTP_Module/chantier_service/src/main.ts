import { NestFactory } from '@nestjs/core';
import { ChantierModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ChantierModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4444,
    },
  });
  app.listen();
  console.log('Chantier service is listening on port 4444');
}
bootstrap();
