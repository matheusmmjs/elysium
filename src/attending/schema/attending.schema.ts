import { randomUUID } from 'crypto';
import { Document, Schema, Types } from 'mongoose';

export const AttendingSchema = new Schema(
  {
    clientId: { type: String, required: true },
    central: { type: Types.ObjectId, ref: 'Central' },
    //TODO gerar um schema para o protocol
    protocolId: { type: String, required: true, default: randomUUID() },
    context: { type: String },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

export interface Attending extends Document {
  clientId: string;
  protocolId: string;
  context: string;
  createdAt: Date;
  updatedAt: Date;
}
