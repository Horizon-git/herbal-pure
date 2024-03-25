import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
  });
}

export const apiClient = createClient();
