import { createSlice } from '@reduxjs/toolkit';

export const forgotPasswordSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    showForgotPassword: false,
  },
  reducers: {
    setShowForgotPassword: (state, action) => {
      state.showForgotPassword = action.payload;
    },
  },
});

export const {setShowForgotPassword} =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
