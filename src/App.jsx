import React from 'react';
import Layout from './components/Layout/Layout';
import Home from './components/pages/Home';
import {Routes, Route, useParams} from 'react-router-dom'
import ProductDetails from './components/pages/product/[slug]';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from './redux/reducers';
import { client } from './client';
import { Toaster } from 'react-hot-toast';
import Success from './components/pages/Success';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    client
    .fetch(`*[_type == "product"]`)
    .then((data) => dispatch(setProduct(data)))
    .catch(console.error);

  }, []);

  return (
   
    <Layout>
      <Toaster/>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path={`/product/:slug`} element={<ProductDetails/>}/> 
        <Route path={`/success`} element={<Success/>}/> 
      
      </Routes>
      </Layout>
  );
}

export default App;
