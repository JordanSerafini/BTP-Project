import { Module } from '@nestjs/common';
import { UsersService } from './app.service';
import { UsersController } from './app.controller';
import { CustomLogger } from './logging/custom-logger.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CustomLogger],
})
export class AppModule {}
