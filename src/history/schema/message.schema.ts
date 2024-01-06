import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true },
  name: { type: String, required: true },
  sentDate: { type: Date, default: Date.now },
});

MessageSchema.pre('save', function (next) {
  if (!this.sentDate) {
    this.sentDate = new Date();
  }
  next();
});

import { Document } from 'mongoose';

export interface Message extends Document {
  sender: string;
  recipient: string;
  content: string;
  status: string;
  name: string;
  sentDate: Date;
}
