const axios = require('axios');
import { API_URL } from "../config/config";

export const getCategories = async (): Promise<[string[]] | any>=> {

  const config = {
    method: 'get',
    url: `${API_URL}/category`,
    headers: { }
  };

  try {
    const response = await axios(config);
    return response.data.categories;
  } catch (e: any) {
    alert(`Error: ${e.message}`);
  }
}