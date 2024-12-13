import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Fourniture {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  price: number;
}

export type FournitureDocument = Fourniture & Document;
export const FournitureSchema = SchemaFactory.createForClass(Fourniture);
