import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import forgotPasswordReducer from './forgotPasswordReducer'
import successReducer from './successReducer';
export const store = configureStore({
  reducer: {
    product:productReducer,
    cart:cartReducer,
    showForgotPassword: forgotPasswordReducer,
    successURL: successReducer
  },
});
