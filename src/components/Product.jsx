import React from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '../client'
const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <Link to={`/product/${slug.current}`}>
            <div className='product-card'>
                <img src={urlFor(image && image[0])} width={250} className="product-image" alt={name}/>
           <p className='product-name'>{name}</p>
           <p className='product-price'>${price}</p>
            </div>
        </Link>
    )
}

export default Product