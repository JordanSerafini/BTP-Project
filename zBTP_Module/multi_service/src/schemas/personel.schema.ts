import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Personel {
  @Prop({ required: true })
  user: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export type PersonelDocument = Personel & Document;
export const PersonelSchema = SchemaFactory.createForClass(Personel);
