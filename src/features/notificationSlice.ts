/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type NotificationState = {
  notification: { message: string; type: 'success' | 'error' } | null;
};

const initialState: NotificationState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
