import { Schema, Types } from 'mongoose';

export const MessageSchema = new Schema({
  groupId: { type: Types.ObjectId, ref: 'Group', required: true },
  senderId: { type: Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  created_at: { type: Date, default: Date.now },
});
