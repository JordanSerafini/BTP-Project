import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { UsersController } from './controller/users.controller';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      signOptions: { expiresIn: '60m' },
    }),
    ClientsModule.register([
      {
        name: 'AUTHENTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'authentification_service',
          port: 3001,
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'users_service',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [UsersController, AuthController],
  providers: [JwtAuthGuard],
})
export class AppModule {}
