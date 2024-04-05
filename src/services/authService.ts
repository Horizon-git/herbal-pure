import { authClient } from '../api/authClient';
import { LoginResponse } from '../types/LoginResponse';
import { User } from '../types/User';

const register = ({ name, email, password, phone_number }: User) =>
  authClient.post('/user/register/', {
    name,
    email,
    password,
    phone_number,
  });

const login = ({ email, password }: Omit<User, 'name' | 'phone_number'>) =>
  authClient.post<LoginResponse>('/user/token/', { email, password });

const refresh = (token: string) =>
  authClient.post<LoginResponse>('/user/token/refresh/', { refresh: token });

export const authService = { register, login, refresh };
