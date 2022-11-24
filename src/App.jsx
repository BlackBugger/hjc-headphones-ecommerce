import React from 'react';
import Layout from './components/Layout/Layout';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom'
import ProductDetails from './components/pages/product/[slug]';

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setUser } from './redux/reducers';
import { client } from './client';
import { Toaster } from 'react-hot-toast';
import Success from './components/pages/Success';
import Login from './components/Login';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.product);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]`)
      .then((data) => dispatch(setProduct(data)))
      .catch(console.error);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS', authUser);

      if (authUser) {
        dispatch(setUser(authUser))
      } else {
        dispatch(setUser(null))
      }
      console.log(user);
    
    })

     //eslint-disable-next-line
  }, []);

  return (

    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path={`/product/:slug`} element={<ProductDetails />} />
        <Route path={`/success`} element={<Success />} />

      </Routes>
    </Layout>
  );
}

export default App;
