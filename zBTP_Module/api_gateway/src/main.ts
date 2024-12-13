import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://sli.tinkerbell-pentest.me'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Connexion au microservice chantier_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 4444,
      // host: 'chantier_service',
    },
  });

  // Connexion au microservice devis_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 4445,
      // host: 'devis_service',
    },
  });

  // Connexion au microservice multi_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 4446,
      // host: 'multi_service',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`API Gateway is running on: ${3000}`);
}
bootstrap();
