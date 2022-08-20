import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { ISubcategory } from '../types/subcategory';

const SubcategorySchema = new Schema<ISubcategory>({
  name: {type: String, unique: true},
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
});

export const Subcategory = model<ISubcategory>("Subcategory", SubcategorySchema);