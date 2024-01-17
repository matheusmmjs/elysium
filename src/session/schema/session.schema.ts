import { Document, Schema, Types } from 'mongoose';

export const SessionSchema = new Schema(
  {
    clientId: { type: String, required: true },
    central: { type: Types.ObjectId, ref: 'Central' },
    userId: { type: String, required: true },
    isBotSession: { type: Boolean, required: true, default: true },
    isActive: { type: Boolean, required: true, default: true },
    attending: { type: Types.ObjectId, ref: 'Attending' },
  },
  {
    timestamps: true,
  },
);

export interface Session extends Document {
  clientId: string;
  central: Types.ObjectId;
  userId: string;
  isBotSession: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  attending: Types.ObjectId;
}
