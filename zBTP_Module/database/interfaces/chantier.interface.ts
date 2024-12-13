import { HydratedDocument, Types } from 'mongoose';
import { Devis } from './devis.interface';
import { Fourniture } from './fourniture.interface';
import { Outils } from './outils.interface';
import { Personel } from './personel.interface';

export interface Chantier {
  _id: Types.ObjectId;
  numero: string;
  title: string;
  description: string;
  notes: string;
  commentaires: string;
  client: string;
  status: string;
  debut_prevu: Date;
  fin_prevu: Date;
  personnels: Personel[];
  fournitures: Fourniture[];
  outillages: Outils[];
  devis: Devis[];
  createdAt: Date;
  updatedAt: Date;
}

export type MessageDocument = HydratedDocument<Chantier>;
