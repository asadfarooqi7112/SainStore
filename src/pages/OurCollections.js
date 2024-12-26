import React from 'react'

import "./OurCollections.css"
import ProductCard from '../components/ProductCard'
//import { useMediaQuery } from "../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';
import banner1 from "../images/home_banner_1.jpeg"

import Loading from '../components/Loading';

export default function OurCollections(props) {
  //const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const OurCollectionsArray = props.productsData.map((item,index)=><ProductCard key={index} data = {item} />)
  
  return (
    <div className='electronics_container'>
      <Helmet>
        <html lang="en" />
        <title>Our Collections | Sain Store</title>
        <meta name="description" content="Discover the best in electronics at AlCheez! From cutting-edge gadgets to top-quality tech accessories, find everything you need to stay connected and powered up. Shop our extensive collection of electronics today!" />
        <link rel="canonical" href="https://alcheez.com/electronics" />
        <meta name="keywords" content="alcheez, electronics, headset, headphone, handsfree, earphone, airpods, earbuds, speaker, smart watch, charger, cable, mobile stand, laptop stand, power bank, tech accessories, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        {/* https://ogp.me/ */}
        <meta property="og:url" content="https://alcheez.com/electronics" />
        <meta property="og:title" content="Electronics | AlCheez" />
        <meta property="og:description" content="Shop the latest electronics, gadgets, and tech accessories at AlCheez. Discover unbeatable prices and top-quality products today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-larger-screen.png" />

        {/* Twitter tags */}
        {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="AlCheez Online Store" />
        <meta property="twitter:description" content="Check out the latest electronics, gadgets, and tech accessories at AlCheez. Your trusted online store for all things tech!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-larger-screen.png" />

        {/* https://moz.com/blog/meta-referrer-tag */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      
      {OurCollectionsArray.length>0
      ?
        <div className='products_container'>
          <img src={banner1} alt='electronics-image' className='subproduct-image'/>
          <h1>Our Collections</h1>
          <div className='our-collections-card_container'>
            {OurCollectionsArray}
          </div>
      </div>
      :
      <Loading/>
      }
    </div>
  )
}
