import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
//import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';
import banner1 from "../../images/home_banner_1.jpeg"

import "./SubProducts.css"
import Loading from '../../components/Loading';

export default function Shawls() {
  //const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const shawlsArray = productsData.filter((item) => item.category_id === 1).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='shawls_container'>
     <Helmet>
        <html lang="en" />
        <title>Shawls | Sain Store</title>
        <meta name="description" content="Explore a wide range of headsets at AlCheez. Find the perfect headset for your needs with our selection of top-quality products!" />
        <link rel="canonical" href="https://alcheez.com/headsets" />
        <meta name="keywords" content="alcheez, headsets, headphones, earphones, wireless headsets, gaming headsets, tech accessories, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/headsets" />
        <meta property="og:title" content="Headsets | AlCheez" />
        <meta property="og:description" content="Shop the latest headsets at AlCheez. Discover high-quality and affordable options for all your audio needs!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="Headsets | AlCheez" />
        <meta property="twitter:description" content="Check out the best headsets available at AlCheez. Shop now for premium and budget-friendly options!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png" />

        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>

{ shawlsArray.length>0
?
    <div className='shawls_products_container'>
        <img src={banner1} alt='shawls-image' className='subproduct-image'/>
        <h1>Shawls</h1>
        <div className='shawls-card_container'>
          {shawlsArray}
        </div>
    </div>
    :
    <Loading/>
    }
  </div>
  )
}
