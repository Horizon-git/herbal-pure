import axios from 'axios';

export const createClient = () => {
  return axios.create({
    baseURL: 'http://localhost:8080/api',
  });
};