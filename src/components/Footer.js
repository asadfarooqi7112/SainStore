import React, { useState } from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaFacebookF } from "react-icons/fa";
//import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Footer() {
    const [isConnectWithUsShown, setIsConnectWithUsShown] = useState(false);
    const [isExploreWithUsShown, setIsExploreWithUsShown] = useState(false);
    const [isVisitUsShown, setIsVisitUsShown] = useState(false);
     const isSmallDevice = useMediaQuery('(max-width: 768px)')

  return (
    <>    
    {isSmallDevice
        ?
    <div className="footer-container">
      {/*<Link to="/" className='footer_title'><img src={logo} style={{width: "100px",height:"100px"}} alt='site-logo'/><p style={{marginTop:"-10px"}}>SAIN STORE</p></Link>*/}
      <div className="contact-container" style={{width: "100%"}}>
      <div className='dropdown_container'>
          <div className='dropdown_header' onClick={() => setIsConnectWithUsShown(prev => !prev)}>
            <h5 className='dropdown_title'>CONNECT WITH US</h5>
            <span className='dropdown_arrow'>{isConnectWithUsShown ? '⮝' : '⮟'}</span>
          </div>
          {isConnectWithUsShown && (
            <p className='dropdown_content'>
            <p>For wholesale bulk quantity orders & queries:</p>
            <p>Email: sainstore532@gmail.com</p>
            <p>WhatsApp: 0310-4897651</p>
            <p>Facebook: facebook.com/sarwatofficialll</p>
            <p>Instagram: @sarwatofficial</p>
            </p>
          )}
        </div>
      </div>
      <div className="explore-container" style={{width: "100%"}}>
      <div className='dropdown_container'>
          <div className='dropdown_header' onClick={() => setIsExploreWithUsShown(prev => !prev)}>
            <h5 className='dropdown_title'>EXPLORE</h5>
            <span className='dropdown_arrow'>{isExploreWithUsShown ? '⮝' : '⮟'}</span>
          </div>
          {isExploreWithUsShown && (
            <p className='dropdown_content'>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Shipping Policy</p>
            <p>Return & Refunds</p>
            <p>FAQs</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Blogs</p>
            </p>
          )}
        </div>
      </div>
      <div className="visit-us-container" style={{width: "100%"}}>
      <div className='dropdown_container'>
          <div className='dropdown_header' onClick={() => setIsVisitUsShown(prev => !prev)}>
            <h5 className='dropdown_title'>VISIT US</h5>
            <span className='dropdown_arrow'>{isVisitUsShown ? '⮝' : '⮟'}</span>
          </div>
          {isVisitUsShown && (
            <p className='dropdown_content'>
                <p>Topi bazar ......</p>
            </p>
          )}
        </div>
      </div>
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
    :
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
        <p>About Us</p>
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
    }
</>

  )
}
