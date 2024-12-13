import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Fourniture {
  @Prop({ required: true })
  user: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export type FournitureDocument = Fourniture & Document;
export const FournitureSchema = SchemaFactory.createForClass(Fourniture);
