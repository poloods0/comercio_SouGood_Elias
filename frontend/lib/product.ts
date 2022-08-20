const axios = require('axios');
import { API_URL } from "../config/config";
import Product, {CreateProduct} from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  let products = [];

  const config = {
    method: 'get',
    url: `${API_URL}/product`,
    headers: { }
  };

  try {
    const response = await axios(config);
    products = response.data.products;
  } catch (e: any) {
    alert(`Error: ${e.message}`);
  }

  return products;
}

export const addProduct = async (product: CreateProduct, token: string) => {
  const data = JSON.stringify(product);
  
  const config = {
    method: 'post',
    url: `${API_URL}/product`,
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data
  };
  try {
    const response = await axios(config);
    return response;
  } catch (e: any) {
    throw e;
  }
}