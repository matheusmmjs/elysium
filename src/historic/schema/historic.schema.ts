import { Document, Schema, Types } from 'mongoose';
import { Message, MessageSchema } from './message.schema';

export const HistoricSchema = new Schema(
  {
    clientId: { type: String, required: true },
    messages: [MessageSchema],
    central: { type: Types.ObjectId, ref: 'Central' },
  },
  {
    timestamps: true,
  },
);

export interface Historic extends Document {
  clientId: string;
  messages: Message[];
  central: Types.ObjectId;
}
