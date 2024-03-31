/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from '../app/store';
import { UserData } from '../types/UserData';

type AuthState = {
  user: UserData | null;
  isChecked: boolean;
  error: string | undefined;
};

const initialState: AuthState = {
  user: null,
  isChecked: false,
  error: undefined,
};

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async () => {
  const refreshStorage = localStorage.getItem('refreshToken') || '';

  const response = await authService.refresh(refreshStorage);

  const { access, refresh, user } = response.data;

  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);

  return user;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = undefined;
        state.isChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isChecked = true;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;

export const loginAsync = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  dispatch: AppDispatch,
) => {
  const response = await authService.login({ email, password });

  const { access, refresh, user } = response.data;

  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);

  dispatch(setUser(user));
};
