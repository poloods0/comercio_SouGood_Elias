import mongoose from 'mongoose';
import { Category } from '../schemas/Category';
import { ICategory } from '../types/category';

const createCategory = async (request: ICategory) => {
  /*
  Crea una categoría a partir de los datos obtenidos del body en formato json.
  El request sigue la estructura de ICategory.
  */
  try {
    const category = new Category({name: request.name});
    await category.save();
    return category;
  } catch (err: any) {
   if (err.code === 11000) throw new Error("La categoría ya existe.");
   if (err == mongoose.Error.ValidationError) throw new Error("Datos de categoría inválidos.");
   throw err;
  }
};

const getCategories = async () => {
    try {
        const categories = await Category.find().populate("subcategories");
        return categories;
    } catch (err: any) {
        throw err;
    }
};

const removeCategories = async () => {
  try {
    await Category.deleteMany({});
    return "sucess";
  } catch (err: any) {
    throw err;
  }
};

const getCategoryByName = async (categoryName: string): Promise<ICategory | undefined> => {
    try {
        const category = await Category.findOne({name: categoryName});
        if (category) return category;
    } catch (err: any) {
        throw err;
    }
};

module.exports = {
  createCategory,
  getCategories,
  removeCategories,
  getCategoryByName
};
