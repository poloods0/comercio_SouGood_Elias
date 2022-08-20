import Category from "./category";
import Subcategory from "./subcategory";

export default interface Product {
  _id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  price: number;
  subcategory: Subcategory;
  tags: string[];
  stock: number;
  seller: string;
  size: string;
}

export interface CreateProduct {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image?: string;
  price: number;
  stock: number;
  size: string;
  tags: string[];
  seller: string;
}
