import { Document, Schema } from 'mongoose';
import slugify from 'slugify';

export const CentralSchema = new Schema(
  {
    name: { type: String, required: true },
    alias: { type: String, unique: true },
    tenant: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

function generateAlias(name: string): string {
  return slugify(name, {
    lower: true,
    replacement: '_',
    remove: /[*+~.()'"!:@]/g,
  });
}
CentralSchema.pre('save', function (next): void {
  this.alias = generateAlias(this.name);

  next();
});

CentralSchema.pre('findOneAndUpdate', function (next): void {
  const update: any = this.getUpdate();
  if (update.$set && update.$set.name) {
    update.$set.alias = generateAlias(update.$set.name);
  }

  next();
});

export interface Central extends Document {
  name: string;
  tenant: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
