import { HydratedDocument, Types } from 'mongoose';

export interface Fourniture {
  _id: Types.ObjectId;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
export type MessageDocument = HydratedDocument<Fourniture>;
