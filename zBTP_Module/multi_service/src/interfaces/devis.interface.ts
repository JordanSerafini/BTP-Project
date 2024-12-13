import { HydratedDocument, Types } from 'mongoose';

export interface Devis {
  _id: Types.ObjectId;
  numero: string;
  title: string;
  description: string;
  notes: string;
  client: string;
  status: string;
  debut_prevu: Date;
  fin_prevu: Date;
  date_echeance: Date;
  mode_reglement: string;
  tva: string;
  DevisLines: DevisLine[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DevisLine {
  _id: Types.ObjectId;
  devis: string;
  article: string;
  quantite: number;
  prix_ht: number;
  prix_ttc: number;
  tva: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DevisDocument = HydratedDocument<Devis>;
export type DevisLineDocument = HydratedDocument<DevisLine>;
