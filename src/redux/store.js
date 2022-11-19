import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    product:reducer,
    cart:cartSlice,
  },
});
