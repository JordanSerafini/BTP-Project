import { HydratedDocument, Types } from 'mongoose';

export interface Outils {
  _id: Types.ObjectId;
  numero_serie: string;
  title: string;
  description: string;
  notes: string;
  quantite: number;
  quantite_disponible: number;
}
export type OutilsDocument = HydratedDocument<Outils>;
