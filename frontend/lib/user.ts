const axios = require('axios');
import { API_URL } from '../config/config';
//const url = process.env.API_URL;
//const url = 'http://localhost:8000/api';

export const login = async (email: string, password: string): Promise<[string, string, null] | [string, string, string]>=> {
  const data = {
    email,
    password
  };

  const config = {
    method: 'post',
    url: `${API_URL}/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  try {
    const response = await axios(config);
    return [response.data.token, response.data.role, null];
  } catch (e: any) {
    return ["", "", `${e.code}: ${e.message}`];
  }
}

export const register = async (email: string, password: string) => {
  const data = {
    email,
    password
  };

  const config = {
    method: 'post',
    url: `${API_URL}/user`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  axios(config)
    .then((response: any) => {
      return response;
    })
    .catch((err: any) => alert(err))
}