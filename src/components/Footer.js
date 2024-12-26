import React from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {

  return (
    <div className="footer-container">
      {/*<Link to="/" className='footer_title'><img src={logo} style={{width: "100px",height:"100px"}} alt='site-logo'/><p style={{marginTop:"-10px"}}>SAIN STORE</p></Link>*/}
      <div className="contact-container">
        <h5 style={{marginBottom:"40px"}}>CONNECT WITH US</h5>
        <p>For wholesale bulk quantity orders & queries:</p>
        <p>Email: sainstore532@gmail.com</p>
        <p>WhatsApp: 0310-4897651</p>
        <p>Facebook: facebook.com/sarwatofficialll</p>
        <p>Instagram: @sarwatofficial</p>
        <div className="follow-container">

          <a href="https://web.facebook.com/profile.php?id=61563062738768" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={18} color='#9d0000' />
          </a>
          <a href="https://www.instagram.com/alcheez/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} color='#9d0000'/>
          </a>
          <a href="https://www.youtube.com/@alcheez-d9b" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={20} color='#9d0000'/>
          </a>
      </div>
      </div>
      <div className="explore-container">
        <h5 style={{marginBottom:"40px"}}>EXPLORE</h5>
        <Link>About Us</Link>
        <p>Contact Us</p>
        <p>Shipping Policy</p>
        <p>Return & Refunds</p>
        <p>FAQs</p>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Blogs</p>
      </div>
      <div className="visit-us-container">
        <h5 style={{marginBottom:"40px"}}>VISIT US</h5>
        <p>Topi bazar ......</p>
      </div>
    </div>
  )
}
