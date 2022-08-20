import { ICategory } from "./category";
import { ISubcategory } from "./subcategory";
import { IUser } from "./user";

export interface IProduct {
    name: string;
    description: string;
    category: ICategory;
    subcategory: ISubcategory;
    seller: IUser;
    price: number;
    stock: number;
    imageUrl: string;
    size: string;
    tags: string[];
}