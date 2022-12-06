import React from 'react'
import { client } from '../client'
import imageUrlBuilder from '@sanity/image-url'
import { Link } from 'react-router-dom'
const Banner = ({ banner }) => {

    const builder = imageUrlBuilder(client)

    function urlFor(source) {
        return builder.image(source)
    }

    return (



        <div className='hero-banner-container'>

            <p className='beats-solo'>{banner.smallText}</p>
            <h3>{banner.midText}</h3>
            <h1>{banner.largeText1}</h1>
            <div className='desc'>
                    <p>{banner.desc}</p>
                </div>
            {banner.image && <img src={urlFor(banner.image)} alt="headphones" className='hero-banner-image' />
            }
            <div>
                <Link to={`/product/${banner.product}`}>
                    <button type='button'>{banner.buttonText}</button>
                </Link>
            </div>

        </div>
    )
}

export default Banner