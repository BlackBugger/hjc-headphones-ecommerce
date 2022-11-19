import { createSlice } from '@reduxjs/toolkit';

export const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    product: [],
    showCart: false,
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    
  },
});

export const {setProduct,setShowCart} =
  ecommerceSlice.actions;

export default ecommerceSlice.reducer;
