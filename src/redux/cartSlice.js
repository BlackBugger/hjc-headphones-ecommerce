/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, current } from '@reduxjs/toolkit';
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotalPrice: 0,
    cartTotalQuantity: 0,
    qty: 1,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const itemIndex = state.cartItems.findIndex((item) => item._id === newItem._id);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += state.qty;
        state.cartTotalPrice += action.payload.price * state.qty;
        state.cartTotalQuantity += state.qty;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: state.qty };
        const { price, cartQuantity } = state.cartItems;
        state.cartItems.push(tempProduct);
        state.cartTotalPrice += action.payload.price * state.qty;
        state.cartTotalQuantity += state.qty;
      }
    },
    removeFromCart(state, action) {
      const newItem = action.payload;

      const foundProduct = state.cartItems.find((item) => item._id === newItem._id);
      const newCartItems = state.cartItems.filter((item) => item._id !== newItem._id);
      console.log(foundProduct.price);
      state.cartTotalPrice -= foundProduct.price * foundProduct.cartQuantity;
      state.cartTotalQuantity -= foundProduct.cartQuantity;
      state.cartItems = newCartItems;
    },

    cartQty(state, action) {
      const newItem = action.payload.item;
      const itemIndex = state.cartItems.findIndex((item) => item._id === newItem._id);

      if (action.payload.type === 'INCREMENT') {
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartTotalPrice += newItem.price;
      } else {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartTotalPrice -= newItem.price;
      }
    },
    setQty(state, action) {
      console.log(action.payload.type);
      switch (action.payload.type) {
        case 'INCREMENT':
          return { ...state, qty: state.qty + 1 };
        case 'DECREMENT':
          return { ...state, qty: state.qty - 1 };
        default:
          return state;
      }
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotalPrice: (state, action) => {
      state.cartTotalPrice = action.payload;
    },
    setCartTotalQuantity: (state, action) => {
      state.cartTotalQuantity = action.payload;
    },
  },
});

export const { setCartItems, addToCart, setQty, cartQty, removeFromCart,setCartTotalPrice,setCartTotalQuantity} = cartSlice.actions;

export default cartSlice.reducer;
