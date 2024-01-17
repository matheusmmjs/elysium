import { randomUUID } from 'crypto';
import { Schema } from 'mongoose';

export const AttendingSchema = new Schema(
  {
    clientId: { type: String, required: true },
    protocolId: { type: String, required: true, default: randomUUID() },
    context: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    endAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

import { Document } from 'mongoose';

export interface Attending extends Document {
  clientId: string;
  protocolId: string;
  context: string;
  createdAt: Date;
  updatedAt: Date;
  endAt: Date;
}
