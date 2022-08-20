import ICartItem from "../types/cart";
import Product from "../types/product";

export const cartItemFromProduct = (product: Product): ICartItem => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    description: product.description,
    image: product.image,
    price: product.price,
    amount: 0
  } as ICartItem;
};
