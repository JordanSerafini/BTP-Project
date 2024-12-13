import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Devis {
  @Prop({ required: true })
  numero: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  debut_prevu: Date;

  @Prop()
  fin_prevu: Date;

  @Prop()
  date_echeance: Date;

  @Prop()
  mode_reglement: string;

  @Prop()
  tva: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DevisLine' }] })
  DevisLines: Types.ObjectId[];
}

export type DevisDocument = Devis & Document;
export const DevisSchema = SchemaFactory.createForClass(Devis);

@Schema({ timestamps: true })
export class DevisLine {
  @Prop({ required: true })
  devis: string;

  @Prop({ required: true })
  article: string;

  @Prop({ required: true })
  quantite: number;

  @Prop({ required: true })
  prix_ht: number;

  @Prop({ required: true })
  prix_ttc: number;

  @Prop({ required: true })
  tva: number;
}

export type DevisLineDocument = DevisLine & Document;
export const DevisLineSchema = SchemaFactory.createForClass(DevisLine);
