import { Schema, Types } from 'mongoose';

export const MessageSchema = new Schema({
  groupId: { type: Types.ObjectId, ref: 'Group', required: true },
  sender_id: { type: Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  created_at: { type: Date, default: Date.now },
});
