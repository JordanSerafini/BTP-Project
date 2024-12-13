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

  // Connexion au microservice auth_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
      // host: 'authentification_service',
    },
  });

  // Connexion au microservice user_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3002,
      // host: 'users_service',
    },
  });

  // Connexion au microservice messagerie_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3333,
      // host: 'messagerie_service',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`API Gateway is running on: ${3000}`);
}
bootstrap();
