import React, { useState } from 'react';
import './Footer.css';
import { FaInstagram } from 'react-icons/fa';
//import { FaYoutube } from 'react-icons/fa';
import { FaFacebookF } from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

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
          <div className='f_dropdown_header' onClick={() => setIsConnectWithUsShown(prev => !prev)}>
            <h5 className='f_dropdown_title'>CONNECT WITH US</h5>
            <span className='f_dropdown_arrow'>{isConnectWithUsShown ? <FiChevronUp/> : <FiChevronDown/>}</span>
          </div>
          {isConnectWithUsShown && (
            <p className='f_dropdown_content'>
            <p>For wholesale bulk quantity orders & queries:</p>
            <p>Email: sainstore532@gmail.com</p>
            <p>WhatsApp: 0310-4897651</p>
            <p>Facebook: facebook.com/sarwatofficialll</p>
            <p>Instagram: @sarwatofficial</p>
            </p>
          )}
      </div>
      <div className="explore-container" style={{width: "100%", marginTop: "-10px"}}>
          <div className='f_dropdown_header' onClick={() => setIsExploreWithUsShown(prev => !prev)}>
            <h5 className='f_dropdown_title'>EXPLORE</h5>
            <span className='f_dropdown_arrow'>{isExploreWithUsShown ? <FiChevronUp/>  : <FiChevronDown/>}</span>
          </div>
          {isExploreWithUsShown && (
            <p className='f_dropdown_content'>
              <Link to="/contact-us" style={{color: "#680e0e", textDecoration: "none"}}>Contact Us</Link>
              <Link to="/shipping-policy" style={{color: "#680e0e", textDecoration: "none"}}>Shipping Policy</Link>
              <Link to="/refund-policy" style={{color: "#680e0e", textDecoration: "none"}}>Return & Refunds</Link>
              <Link to="/privacy-policy" style={{color: "#680e0e", textDecoration: "none"}}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={{color: "#680e0e", textDecoration: "none"}}>Terms of Service</Link>
            </p>
          )}
      </div>
      <div className="visit-us-container" style={{width: "100%",}}>
          <div className='f_dropdown_header' onClick={() => setIsVisitUsShown(prev => !prev)}>
            <h5 className='f_dropdown_title'>VISIT US</h5>
            <span className='f_dropdown_arrow'>{isVisitUsShown ? <FiChevronUp/>  : <FiChevronDown/>}</span>
          </div>
          {isVisitUsShown && (
            <p className='f_dropdown_content'>
                <p>Topi bazar ......</p>
            </p>
          )}
      </div>
      <div className="follow-container">
        <a href="https://www.facebook.com/share/1NpzpteYDL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
        <FaFacebookF size={18} color='#9d0000' />
        </a>
        <a href="https://www.instagram.com/sain.store21/" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={20} color='#9d0000'/>
        </a>
          {/*<a href="https://www.youtube.com/@alcheez-d9b" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={20} color='#9d0000'/>
          </a>*/}
        </div>
    </div>
    :
    <div className="footer-container">
      {/*<Link to="/" className='footer_title'><img src={logo} style={{width: "100px",height:"100px"}} alt='site-logo'/><p style={{marginTop:"-10px"}}>SAIN STORE</p></Link>*/}
      <div className="contact-container">
        <h5 style={{marginBottom:"40px"}}>CONNECT WITH US</h5>
        <p>For Wholesale Bulk Quantity Orders & Queries:</p>
        <p>Email: sainstore532@gmail.com</p>
        <p>WhatsApp: 0310-4897651</p>
        <p>Facebook: facebook.com/sainstore</p>
        <p>Instagram: @sainstore.21</p>
        <div className="follow-container">

          <a href="https://www.facebook.com/share/1NpzpteYDL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={18} color='#9d0000' />
          </a>
          <a href="https://www.instagram.com/sain.store21/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} color='#9d0000'/>
          </a>
          {/*<a href="https://www.youtube.com/@alcheez-d9b" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={20} color='#9d0000'/>
          </a>*/}
        </div>
      </div>
      <div className="explore-container">
        <h5 style={{marginBottom:"20px"}}>EXPLORE</h5>
        <Link to="/contact-us" style={{color: "#680e0e", textDecoration: "none"}}>Contact Us</Link>
        <Link to="/shipping-policy" style={{color: "#680e0e", textDecoration: "none"}}>Shipping Policy</Link>
        <Link to="/refund-policy" style={{color: "#680e0e", textDecoration: "none"}}>Return & Refunds</Link>
        <Link to="/privacy-policy" style={{color: "#680e0e", textDecoration: "none"}}>Privacy Policy</Link>
        <Link to="/terms-of-service" style={{color: "#680e0e", textDecoration: "none"}}>Terms of Service</Link>
      </div>
      <div className="visit-us-container">
        <h5 style={{marginBottom:"20px"}}>VISIT US</h5>
        <p>Topi bazar ......</p>
      </div>
    </div>
    }
</>

  )
}
