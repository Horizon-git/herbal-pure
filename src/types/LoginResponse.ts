import { UserData } from './UserData';

export interface LoginResponse {
  access: string;
  refresh: string;
  user: UserData;
}
