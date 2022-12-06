import React from 'react';
import Layout from './components/Layout/Layout';
import Home from './components/pages/Home';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import ProductDetails from './components/pages/product/[slug]';

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from './redux/productReducer';
import { setUser, setCartItems } from './redux/cartReducer';
import { client } from './client';
import { Toaster } from 'react-hot-toast';
import Success from './components/pages/Success';
import Login from './components/Login';
import { auth, db } from './firebase';
import Orders from './components/Orders';



function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.cart);


  useEffect(() => {
    client
      .fetch(`*[_type == "product"]`)
      .then((data) => dispatch(setProduct(data)))
      .catch(console.error);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        const thist = {
          'email': authUser.email,
          'uid': authUser.uid,
          'name': authUser.displayName
        };
        dispatch(setUser(thist))

      } else {
        dispatch(setUser(null))
      }

    })

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    db
      .collection('users')
      .doc(user?.uid)
      .collection('cart')
      .onSnapshot(snapshot => {
        dispatch(setCartItems(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))))
      })

    //eslint-disable-next-line
  }, [user]);

  const ProtectedRoute = ({ user }) => {
    return user ? <Outlet /> : <Navigate to="/" />
  };

  return (

    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={user ? <Navigate to='/' /> : <Login />} />
        <Route path={`/product/:slug`} exact element={<ProductDetails />} />
        <Route path={`/success`} exact element={<Success />} />

        <Route element={<ProtectedRoute user={user} />}>
          
          <Route path="/orders" exact element={<Orders />} />
        </Route>

      </Routes>
    </Layout>
  );
}

export default App;
