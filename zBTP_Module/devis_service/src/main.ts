import { NestFactory } from '@nestjs/core';
import { ChantierModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ChantierModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4445,
    },
  });
  app.listen();
  console.log('Devis service is listening on port 44444544');
}
bootstrap();
