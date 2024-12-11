import { HydratedDocument, Types } from 'mongoose';

export interface Message {
  _id: Types.ObjectId;
  groupId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  status?: 'sent' | 'delivered' | 'read';
  created_at?: Date;
}

export type MessageDocument = HydratedDocument<Message>;
