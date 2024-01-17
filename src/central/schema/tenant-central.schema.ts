import { Document, Schema, Types } from 'mongoose';

export const TenantCentralSchema = new Schema(
  {
    tenant: { type: String, required: true },
    central: { type: Types.ObjectId, ref: 'Central' },
  },
  {
    timestamps: true,
  },
);

export interface TenantCentral extends Document {
  tenant: string;
  central: Types.ObjectId;
}
