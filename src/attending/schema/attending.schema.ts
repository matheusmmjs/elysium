import { randomUUID } from 'crypto';
import { Schema } from 'mongoose';

export const AttendingSchema = new Schema(
  {
    clientId: { type: String, required: true },
    protocolId: { type: String },
    context: { type: String },
  },
  {
    timestamps: true,
  },
);

AttendingSchema.pre('save', function (next) {
  if (!this.protocolId) {
    this.protocolId = randomUUID();
  }
  next();
});

import { Document } from 'mongoose';

export interface Attending extends Document {
  clientId: string;
  protocolId: string;
  context: string;
  createdAt: Date;
  updatedAt: Date;
}
