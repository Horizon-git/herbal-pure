import { apiClient } from '../api/apiClient';
import { Order } from '../types/Order';

export const getUserOrders = (accessToken: string) => {
  return apiClient.get('/orders/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const orderProducts = (accessToken: string, order: Order) => {
  return apiClient.post('/orders/', order, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getOrderById = (accessToken: string, orderId: string) => {
  return apiClient.get(`/orders/${orderId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
