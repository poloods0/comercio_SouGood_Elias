import { Types } from 'mongoose';
import { Product } from '../schemas/Product';
import { User } from '../schemas/User';
import { IProduct } from '../types/product';

interface CreateProduct extends Omit<IProduct, 'seller'> {
  seller: Types.ObjectId
}

const createProduct = async (request: CreateProduct): Promise<IProduct> => {
  try {
    const sellerUser = await User.findOne({ email: request.seller});
    if (!sellerUser) throw new Error("Proveedor no encontrado");
    request.seller = sellerUser._id;
    const product = new Product(request);
    await product.save();
    return product;
  } catch (error: any) {
    throw error;
  }
}

const getProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find().populate("category", "name").populate("subcategory", "name");
    return products;
  } catch (error: any) {
    throw error;
  }
}

const getProduct = async (id: number): Promise<IProduct> => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Producto no encontrado.");
    return product;
  } catch (error: any) {
    throw error;
  }
}

const deleteProduct = async (id: number): Promise<void> => {
  try {
    await Product.deleteOne({_id: id});
  } catch (error: any) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
}


