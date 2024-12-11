import { Schema } from 'mongoose';

export const MessageSchema = new Schema(
  {
    groupId: { type: String, required: true },
    content: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);
