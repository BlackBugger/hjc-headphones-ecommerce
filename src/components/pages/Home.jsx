import Banner from '../../components/Banner';
import FooterBanner from '../../components/FooterBanner';
import { client } from '../../client';
import { useEffect, useState } from 'react';
import React from 'react';
import Product from '../../components/Product';
import { useSelector} from "react-redux";
import { setProduct } from '../../redux/reducers';
const Home = () => {
    const [banner, setBanner] = useState(null);
    const [ban, setBan] = useState([]);
    const { product } = useSelector((state) => state.product)

  
    useEffect(() => {
 
      client
        .fetch(`*[_type == "banner"]`)
        .then((data) => {
          setBanner(data)
          setBan(data[0])
        })
  
        .catch(console.error);
  
    }, []);
  
    return (
   
      <div className="App">
        <Banner banner={ban} />
        <div className="products-heading">
          <h2>Best Selling Product</h2>
          <p>Speakers of many variations</p>
        </div>
        <div className="products-container">{product?.map((product) => <Product key={product._id} product={product} />)}</div>
        <FooterBanner footerBanner={ban} />
      </div>
     
    );
  }

export default Home