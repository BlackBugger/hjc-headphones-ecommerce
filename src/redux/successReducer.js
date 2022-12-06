import { createSlice } from '@reduxjs/toolkit';

export const successSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    successURL: false,
  },
  reducers: {
    EnableSuccessURL: (state, action) => {
      state.successURL = action.payload;
    },
  },
});

export const {EnableSuccessURL} =
  successSlice.actions;

export default successSlice.reducer;
