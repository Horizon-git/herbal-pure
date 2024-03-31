import { authClient } from '../api/authClient';
import { LoginResponse } from '../types/LoginResponse';
import { User } from '../types/User';

const register = ({ name, email, password, phone }: User) =>
  authClient.post('/user/register/', {
    name,
    email,
    password,
    phone_number: phone,
  });

const login = ({ email, password }: { email: string; password: string }) =>
  authClient.post<LoginResponse>('/user/token/', { email, password });

const refresh = (token: string) =>
  authClient.post<LoginResponse>('/user/token/refresh/', { refresh: token });

export const authService = { register, login, refresh };
