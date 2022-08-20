import mongoose from 'mongoose';
import { Category } from '../schemas/Category';
import { Subcategory } from '../schemas/Subcategory';
import { ISubcategory } from '../types/subcategory';
const CategoryController = require('./categoryController');

const createSubcategory = async (request: ISubcategory) => {
  /*
  Crea una subcategoría a partir de los datos obtenidos del body en formato json.
  El request sigue la estructura de ISubcategory.
  */
  try {
    const category = await CategoryController.getCategoryByName(request.category);
    const subcategory = new Subcategory({name: request.name, category: category._id});
    await subcategory.save();

    // Se anade la subcategoría a la categoría
    category.subcategories.push(subcategory._id);
    await category.save();

    return subcategory;
  } catch (err: any) {
   if (err.code === 11000) throw new Error("La subcategoría ya existe.");
   if (err == mongoose.Error.ValidationError) throw new Error("Datos de subcategoría inválidos.");
   throw err;
  }
};

const removeSubcategories = async () => {
  try {
    await Subcategory.deleteMany({});
    return "sucess";
  } catch (err: any) {
    throw err;
  }
};

const getSubcategoriesFromCategory = async (categoryName: string): Promise<Array<ISubcategory>> => {
  try {
    const category = await Category.findOne({name: categoryName});
    const subcategories = category ? await Subcategory.find({category: category._id}) : [];
    return subcategories;
  } catch (err: any) {
    throw err;
  }
}

module.exports = {
  createSubcategory,
  removeSubcategories,
  getSubcategoriesFromCategory
};
