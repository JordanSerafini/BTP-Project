import { Schema } from 'mongoose';

export const GroupSchema = new Schema(
  {
    name: { type: String, required: false },
    type: { type: String, enum: ['group', 'direct'], required: true },
    members: { type: [String], required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);
