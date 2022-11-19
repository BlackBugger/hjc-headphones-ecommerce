import React from 'react'
import { client } from '../client'
import imageUrlBuilder from '@sanity/image-url'
import {Link} from 'react-router-dom'
const Banner = ({banner}) => {
    
    const builder = imageUrlBuilder(client)

    // Then we like to make a simple function like this that gives the
    // builder an image and returns the builder for you to specify additional
    // parameters:
    function urlFor(source) {
      return builder.image(source)
    }
    return (



        <div className='hero-banner-container'>
            <div>
                <p className='beats-solo'>{banner.smallText}</p>
                <h3>{banner.midText}</h3>
                <h1>{banner.largeText1}</h1>
                {banner.image && <img src={urlFor(banner.image)} alt="headphones" className='hero-banner-image' />
  }
                <div>
                    <Link to={`/product/${banner.product}`}>
                        <button type='button'>{banner.buttonText}</button>
                    </Link>
                    <div className='desc'>
                        <h5>Description</h5>
                        <p>{banner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner