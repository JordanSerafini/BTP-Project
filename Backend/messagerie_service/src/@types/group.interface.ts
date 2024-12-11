import { HydratedDocument, Types } from 'mongoose';

export interface GroupMember {
  userId: Types.ObjectId;
  joinedAt: Date;
}

export interface Group {
  _id: Types.ObjectId;
  type: 'group' | 'direct';
  name?: string;
  members: GroupMember[];
  createdBy: Types.ObjectId;
  created_at?: Date;
}

export type GroupDocument = HydratedDocument<Group>;
