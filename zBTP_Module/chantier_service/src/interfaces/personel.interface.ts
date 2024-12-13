import { HydratedDocument, Types } from 'mongoose';

export interface Personel {
  _id: Types.ObjectId;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PersonelDocument = HydratedDocument<Personel>;