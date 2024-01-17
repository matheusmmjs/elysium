import { Schema, Types } from 'mongoose';

export const SessionSchema = new Schema(
  {
    clientId: { type: String, required: true },
    userId: { type: String, required: true },
    isBotSession: { type: Boolean, required: true, default: true },
    isActive: { type: Boolean, required: true, default: true },
    attending: { type: Types.ObjectId, ref: 'Attending' },
    endAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

import { Document } from 'mongoose';

export interface Session extends Document {
  clientId: string;
  userId: string;
  isBotSession: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  endAt: Date;
  attending: Types.ObjectId;
}
