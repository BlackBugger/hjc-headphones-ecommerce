/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    user: [],
    cartItems: [],
    cartTotalPrice: 0,
    cartTotalQuantity: 0,
    qty: 1,
    stripeData: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const user = state.user;
      const itemIndex = state.cartItems.findIndex((item) => item._id === newItem._id);
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += state.qty;
        if (user) {
          const tempProducts = { ...action.payload, cartQuantity: state.cartItems[itemIndex].cartQuantity };
          db.collection('users').doc(user?.uid).collection('cart').doc(action.payload._id).set({
            cart: tempProducts,
            created: new Date(),
          });
        } else {
          state.cartTotalPrice += action.payload.price * state.qty;
          state.cartTotalQuantity += state.qty;
        }
      } else {
        const tempProduct = { ...action.payload, cartQuantity: state.qty };
        if (user) {
          db.collection('users').doc(user?.uid).collection('cart').doc(action.payload._id).set({
            cart: tempProduct,
            created: new Date(),
          });
        } else {
          state.cartItems.push(tempProduct);
          state.cartTotalPrice += action.payload.price * state.qty;
          state.cartTotalQuantity += state.qty;
        }
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

        db.collection('users')
          .doc(state.user?.uid)
          .collection('cart')
          .doc(action.payload.item._id)
          .update({ 'cart.cartQuantity': state.cartItems[itemIndex].cartQuantity });
      } else {
        state.cartItems[itemIndex].cartQuantity -= 1;

        state.cartTotalPrice -= newItem.price;

        db.collection('users')
          .doc(state.user?.uid)
          .collection('cart')
          .doc(action.payload.item._id)
          .update({ 'cart.cartQuantity': state.cartItems[itemIndex].cartQuantity });
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
      const newItem = action.payload;
      const totalQuantity = newItem.map((item) => item.data.cart.cartQuantity);
      const totalPrice = newItem.map((item) => item.data.cart.price * item.data.cart.cartQuantity);
      state.cartItems = [];
      newItem.map((item) => {
        state.cartItems.push(item.data.cart);
      });
      state.cartTotalQuantity = totalQuantity.reduce((a, b) => a + b, 0);
      state.cartTotalPrice = totalPrice.reduce((a, b) => a + b, 0);
    },
    setCartTotalPrice: (state, action) => {
      state.cartTotalPrice = action.payload;
    },
    setCartTotalQuantity: (state, action) => {
      state.cartTotalQuantity = action.payload;
    },
    setStripeData: (state, action) => {
      state.stripeData = action.payload;
    },
    deleteCart: (state, action) => {
      db
      .collection('users')
      .doc(state.user?.uid)
      .collection('cart').get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
      });
      
    },
  },
});

export const { setCartItems, addToCart, setQty, cartQty, removeFromCart, setCartTotalPrice, setCartTotalQuantity, setUser, setStripeData, deleteCart} = cartSlice.actions;

export default cartSlice.reducer;
