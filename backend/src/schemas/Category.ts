import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { ICategory } from '../types/category';

const CategorySchema = new Schema<ICategory>({
  name: {type: String, unique: true},
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
    unique: true,
    default: []
  }],
});

export const Category = model<ICategory>("Category", CategorySchema);
