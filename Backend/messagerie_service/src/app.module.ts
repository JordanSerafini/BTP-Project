import { Module } from '@nestjs/common';
import { MessagesController } from './app.controller';
import { MessagerieService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from './schemas/group.schema';
import { MessageSchema } from './schemas/message.schema';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema },
      { name: 'Message', schema: MessageSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagerieService],
})
export class AppModule {}
