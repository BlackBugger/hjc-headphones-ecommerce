import { createSlice } from '@reduxjs/toolkit';

export const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    product: [],
    user: null,
    showCart: false,
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    
  },
});

export const {setProduct,setShowCart,setUser} =
  ecommerceSlice.actions;

export default ecommerceSlice.reducer;
