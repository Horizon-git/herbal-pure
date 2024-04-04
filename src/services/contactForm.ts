import { apiClient } from '../api/apiClient';
import { Message } from '../types/Message';

export const sendPostContactUs = ({ name, email, message }: Message) => {
  return apiClient.post('/user/contact-us/', { name, email, message });
};
