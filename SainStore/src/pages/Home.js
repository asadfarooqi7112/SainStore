import React from 'react'

import "./Home.css"
import { useMediaQuery } from "../hooks/useMediaQuery";

import ProductCard from '../components/ProductCard';
import RotatingAds from "../components/RotatingAds";
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import RotatingProducts from '../components/RotatingProducts';

import banner1 from "../images/home_banner_1.jpeg"
import banner2 from "../images/home_banner_2.jpeg"

export default function Home(props) {
  const navigate = useNavigate()
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const openWhatsApp = () => {
    const phoneNumber = '923468576853'; // replace with the actual phone number
    const message = encodeURIComponent('Hello, I am interested in your products.'); // replace with your pre-written text
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  }

  const imageArray = [
    {url: banner1},
    {url: banner2},
    ];

  const shawls = props.productsData.filter((item) => item.category_id === 1).map((item, index) => (<ProductCard key={index} data={item} />));
 
  return (
    <div className='home_container'>
      <Helmet>
        <html lang="en" />
        <title>Home | SAIN STORE</title>
        <meta name="description" content="Welcome to AlCheez, your one-stop shop for the latest electronics, gadgets, and tech accessories. Explore our wide range of products today!" />
        <link rel="canonical" href="https://alcheez.com/" />
        <meta name="keywords" content="alcheez, electronics, headset, headphone, handsfree, earphone, airpods, earbuds, speaker, smart watch, charger, cable, mobile stand, laptop stand, power bank, tech accessories, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        {/* https://ogp.me/ */}
        <meta property="og:url" content="https://alcheez.com/" />
        <meta property="og:title" content="AlCheez Online Store" />
        <meta property="og:description" content="Shop the latest electronics, gadgets, and tech accessories at AlCheez. Discover unbeatable prices and top-quality products today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Twitter tags */}
        {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="AlCheez Online Store" />
        <meta property="twitter:description" content="Check out the latest electronics, gadgets, and tech accessories at AlCheez. Your trusted online store for all things tech!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* https://moz.com/blog/meta-referrer-tag */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      {shawls.length>0
      ?
      <>
      <div className='whatsapp-icon'>
        <FaWhatsapp size={40} color="#25D366" onClick={openWhatsApp}/>
      </div>
      <div style={isSmallDevice?intro_container_smaller_devices:intro_container}>
        {<RotatingAds slides={imageArray} parentWidth={98.70}/>}
      </div>
      <div className='new-arrivals_container'>
      <h3 style={{ position: "relative", display: "inline-block", marginBottom: "10px", textAlign: "center" }}>
        New Arrivals
        <span style={{display: "block", height: "1.5px",backgroundColor: "black", width: "65%", margin: "25px auto 0"}}></span>
      </h3>

        <div style={isSmallDevice?new_arrivals_row_smaller_devices:new_arrivals_row}>
          {props.newArrivals.map((item, index) => (
            <div key={index} style={isSmallDevice?new_arrivals_container_smaller_devices:new_arrivals_container}>
              <img
                src={item.productimages[0]?.image_url}
                alt="Product"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <p style={new_arrivals_name}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mens-shawls_container'>
        <h3>
          Men's Shawls
          <span style={{display: "block", height: "1.5px",backgroundColor: "black", width: "65%", margin: "25px auto 0"}}></span>
        </h3>
        <div className='card_container'>
          <RotatingProducts slides =  {shawls}/>
        </div> 
      </div>
      </>:
      <Loading/>}
  </div>
  )
}

const intro_container={
  height: "100vh",
  width: "98.70vw",
  marginTop: "10px",
  marginBottom: "10px"
}
const intro_container_smaller_devices={
  height: "50vh",
  width: "98.70vw",
  marginTop: "0px",
  marginBottom: "10px"
}
const new_arrivals_row = {
  display: "flex", // Use flexbox to display items in a row
  flexWrap: "nowrap",
  margin: "0 20px", // Add some margin around the container
  overflowX: "auto", // Allow scrolling if the cards overflow horizontally
}
const new_arrivals_row_smaller_devices = {
  display: "flex", // Use flexbox to display items in a row
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%",
  margin: "0 20px", // Add some margin around the container
}
const new_arrivals_container = {
  margin: "20px",
  marginBottom: "20px",
  position: "relative",
  width: "410px",
  height: "600px",
}
const new_arrivals_container_smaller_devices = {
  margin: "20px",
  marginBottom: "20px",
  position: "relative",
  height: "600px",
}
const new_arrivals_name = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  height: "60px",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#3a3a3a",
  color: "white",
  width: "100%",
  cursor: "pointer",
}