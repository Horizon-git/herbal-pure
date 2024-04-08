import axios from 'axios';

export const createClient = () => {
  return axios.create({
    baseURL: 'https://herbalpureapi.onrender.com/api/',
  });
};
