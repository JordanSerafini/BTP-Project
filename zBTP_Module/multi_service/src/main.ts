import { NestFactory } from '@nestjs/core';
import { MultiserviceModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MultiserviceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4446,
    },
  });
  app.listen();
  console.log('Multi service is listening on port 4446');
}
bootstrap();
