import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Outils {
  @Prop({ required: true })
  numero_serie: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  quantite: number;

  @Prop({ required: true })
  quantite_disponible: number;
}

export type OutilsDocument = Outils & Document;
export const OutilsSchema = SchemaFactory.createForClass(Outils);
