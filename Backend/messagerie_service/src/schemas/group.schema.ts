import { Schema, Types } from 'mongoose';

const MemberSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now },
});

export const GroupSchema = new Schema({
  name: { type: String },
  type: { type: String, enum: ['group', 'direct'], required: true },
  members: { type: [MemberSchema], required: true },
  createdBy: { type: Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});
