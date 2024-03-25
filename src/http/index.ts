import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: 'http://localhost:8080/api',
  });
}

export const apiClient = createClient();
