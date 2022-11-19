import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../../client';
import { useParams } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from '../../Product';
import {toast} from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux";
import {addToCart, setQty} from '../../../redux/cartSlice'
import { setShowCart } from '../../../redux/reducers';

const ProductDetails = () => {
  const [details, setDetails] = useState([]);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { product } = useSelector((state) => state.product);
  const qty = useSelector((state) => state.cart.qty);

  useEffect(() => {
    client
      .fetch(`*[slug.current == "${slug}"]`)
      .then((data) => {
        setDetails(data[0]);
      })
      .catch(console.error);
  }, [slug]);

const handleAddtoCart = (product,qty) => {
  dispatch(addToCart(product,qty))
  toast.success(`${qty} ${product.name} added to the cart.`)
}

const handleDecrement = (type) => {
  if(qty - 1 < 1) return 1
  else { dispatch(setQty({type: "DECREMENT"}))}
}
const buyNow = (product,qty) => {
  dispatch(addToCart(product,qty))
  dispatch(setShowCart(true))
}




  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">{details.image && <img src={urlFor(details.image[index])} className="product-detail-image" alt='' />}</div>
          <div className="small-images-container">
            {details.image &&
              details.image?.map((item, i) => (
                <img
                  src={urlFor(item)}
                  className={i == index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                  alt={details.name}
                  key={i}
                />
              ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{details.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details.details}</p>
          <p className="price">P{details.price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={()=>handleDecrement()}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {qty}
              </span>
              <span className="plus" onClick={()=>dispatch(setQty({type: "INCREMENT"}))}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={()=>handleAddtoCart(details,qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={()=>buyNow(details,qty)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {product?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
