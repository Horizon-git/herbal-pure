/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

type AuthState = {
  user: boolean;
  isChecked: boolean;
  error: string | undefined;
};

const initialState: AuthState = {
  user: false,
  isChecked: true,
  error: undefined,
};

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async () => {
  const refreshStorage = localStorage.getItem('refreshToken') || '';

  const data = await authService.refresh(refreshStorage);

  const { access, refresh } = data.data;

  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
});

// export const loginAsync = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }: { email: string; password: string }) => {
//     const data = await authService.login({ email, password });

//     const { access, refresh } = data.data;

//     localStorage.setItem('accessToken', access);
//     localStorage.setItem('refreshToken', refresh);
//   },
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.user = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthAsync.fulfilled, state => {
        state.user = true;
        state.error = undefined;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // .addCase(loginAsync.fulfilled, state => {
    //   state.user = true;
    //   state.error = undefined;
    // })
    // .addCase(loginAsync.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;

export const loginAsync = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await authService.login({ email, password });

  const { access, refresh } = data.data;

  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};
