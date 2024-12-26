import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Offcanvas } from 'react-bootstrap';
import './Header.css';
import HamburgerButton from './HamburgerButton';
import SearchBar from './SearchBar';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import FreeShippingBanner from './FreeShippingBanner';

import logo from "../images/logo_for_web.png"

export default function Header() {
  const { openCart, cartQuantity } = useShoppingCart();
  const [sideMenu, setSideMenu] = useState(false);
  const [isElectronicsSubMenu, setIsElectronicsSubMenu] = useState(false);

  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  function handleSubMenu(e){
    setIsElectronicsSubMenu(prev=>!prev)
  }

  return (
    <div>
      {!isSmallDevice ? (
        <>
        <FreeShippingBanner/>
        <div className='header_container'>
        <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "0 20px",
        }}
        >
  {/* Empty Spacer for Left */}
  <div style={{ flex: 1 }}></div>

  {/* Centered Title */}
  <Link
    to="/"
    className="header_title"
    style={{
      flex: "0 1 auto", // Prevent it from stretching
      textAlign: "center",
    }}
  >
    <img
      src={logo}
      style={{ width: "50px", height: "50px" }}
      alt="site-logo"
    />
    SAIN STORE
  </Link>

  {/* Right-Aligned Elements */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "20px",
      flex: 1, // Ensures it occupies the same space as the left spacer
    }}
  >
    <SearchBar />
    <button className="cart-button" onClick={openCart}>
      <FiShoppingCart color="black" size={25} />
      {cartQuantity !== 0 && (
        <div className="cart-item-counter">{cartQuantity}</div>
      )}
    </button>
  </div>
</div>

          <ul className='nav_list'>
            <li>
              <NavLink to="/" className="nav_item">HOME</NavLink>
            </li>
            <li>
              <NavLink
                to="/our-collections"
                className="nav_item"
                onMouseOver={() => setIsElectronicsSubMenu(true)}
                onMouseLeave={() => setIsElectronicsSubMenu(false)}
                onClick={() => setIsElectronicsSubMenu(false)}
              >
                MEN <FiChevronDown />
              </NavLink>
              {isElectronicsSubMenu && (
                <div
                  className='electronics_sub_menu'
                  onMouseOver={() => setIsElectronicsSubMenu(true)}
                  onMouseLeave={() => setIsElectronicsSubMenu(false)}
                  onClick={() => setIsElectronicsSubMenu(false)}
                >
                  <NavLink to="/our-collections/shawls" className="sub_menu_item">Shawls</NavLink>
                </div>
              )}
            </li>
          {/*  <li>
              <NavLink to="/track-order" className="nav_item">Track Order</NavLink>
            </li>*/}
            <li>
              <NavLink to="/contact-us" className="nav_item">CONTACT US</NavLink>
            </li>
          </ul>
        </div>
        </>
      ) : (
        <>
        <FreeShippingBanner/>
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#F5F5F5", paddingBottom: "10px" }}>
          <div className='header_container_smaller_devices'>
            <div onClick={() => setSideMenu(true)}>
              <HamburgerButton />
            </div>
            <Link to="/" className='header_title_smaller_devices'><img src={logo} style={{width: "40px",height:"40px"}} alt='site-logo'/>SAIN STORE</Link>
            <SearchBar />
            <button className='cart-button-smaller-devices' onClick={openCart}>
              <FiShoppingCart color="black" size={20} />
              {cartQuantity !== 0 && <div className='cart-item-counter-smaller-devices'>{cartQuantity}</div>}
            </button>
            <Offcanvas show={sideMenu} onHide={() => setSideMenu(false)} style={{ width: "250px" }}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className='nav_list_smaller_devices'>
                  <li onClick={()=>setSideMenu(false)}>
                    <NavLink to="/" className="nav_item_smaller_devices">Home</NavLink>
                  </li>
                  <hr style={{ margin: "0px" }} />
                  <li>
                  <div style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                    <NavLink
                      to="/our-collections"
                      className="nav_item_smaller_devices"
                      onClick={()=>setSideMenu(false)}
                    >
                      Men
                    </NavLink>
                      <div
                        style={{
                          border: "none",
                          borderLeft: "1px solid gray",
                          height: "25px",
                          margin: "0px",
                          marginRight: "20px",
                          marginLeft: "auto",
                        }}
                      ></div>
                      {isElectronicsSubMenu ? <FiChevronUp onClick={handleSubMenu}/> : <FiChevronDown onClick={handleSubMenu}/>}
                      </div>
                    <div className={`electronics_sub_menu_smaller ${isElectronicsSubMenu ? 'show' : ''}`} onClick={()=>setSideMenu(false)}>
                      <NavLink to="/our-collections/shawls" className="sub_menu_item_smaller" style={{marginTop: "10px"}}>Shawls</NavLink>
                    </div>
                  </li>
                  <hr style={{ margin: "0px" }} />
                  <li onClick={()=>setSideMenu(false)}>
                    <NavLink to="/contact-us" className="nav_item_smaller_devices">Contact Us</NavLink>
                  </li>
                  <hr style={{ margin: "0px" }} />
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
