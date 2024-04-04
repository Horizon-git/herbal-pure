import { apiClient } from '../api/apiClient';
import { Order } from '../types/Order';

const addAuthorizationHeader = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getUserOrders = (accessToken: string) => {
  return apiClient.get('/orders/', addAuthorizationHeader(accessToken));
};

export const orderProducts = (accessToken: string, order: Order) => {
  return apiClient.post('/orders/', order, addAuthorizationHeader(accessToken));
};

export const getOrderById = (accessToken: string, orderId: string) => {
  return apiClient.get(
    `/orders/${orderId}/`,
    addAuthorizationHeader(accessToken),
  );
};
