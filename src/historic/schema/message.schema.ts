import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  sentDate: { type: Date, default: Date.now },
});

import { Document } from 'mongoose';

export interface Message extends Document {
  from: string;
  to: string;
  content: string;
  status: string;
  name: string;
  role: string;
  sentDate: Date;
}
