import { Schema } from 'mongoose';
import { MessageSchema } from './message.schema';

export const HistorySchema = new Schema({
  clientId: { type: String, required: true },
  messages: [MessageSchema],
});

import { Document } from 'mongoose';
import { Message } from './message.schema';

export interface History extends Document {
  clientId: string;
  messages: Message[];
}
