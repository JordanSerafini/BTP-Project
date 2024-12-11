import { HydratedDocument, Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profile_image?: string;
  status?: 'online' | 'offline' | 'away';
  created_at?: Date;
}

// Pour le modèle
export type UserDocument = HydratedDocument<User>;
