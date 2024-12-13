import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Personnel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  active: boolean;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export type PersonnelDocument = Personnel & Document;
export const PersonnelSchema = SchemaFactory.createForClass(Personnel);
