import React from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '../client'
const FooterBanner = ({ footerBanner: { desc, discount, largeText1, largeText2, saleTime, smallText, midText, product, buttonText, image } }) => {

  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link to={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        {image && <img
          src={urlFor(image)}
          className='footer-banner-image'
          alt='footer-imag'
        />}
      </div>
    </div>
  )
}

export default FooterBanner