import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface FurnitureAttrs {
  title: string;
  description: string;
  furnitureType: string;
  price: number;
  userId: string;
}

interface FurnitureDoc extends mongoose.Document {
  title: string;
  description: string;
  furnitureType: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

interface FurnitureModel extends mongoose.Model<FurnitureDoc> {
  build(attrs: FurnitureAttrs): FurnitureDoc
}

const furnitureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  furnitureType: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: false
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id
    }
  }
});
furnitureSchema.set('versionKey', 'version');
furnitureSchema.plugin(updateIfCurrentPlugin);


furnitureSchema.statics.build = (attrs: FurnitureAttrs) => {
  return new Furniture(attrs);
}

const Furniture = mongoose.model<FurnitureDoc, FurnitureModel>('Furniture', furnitureSchema);


export { Furniture };

