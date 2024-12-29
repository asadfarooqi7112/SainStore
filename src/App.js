import React from "react";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import OurCollections from "./pages/OurCollections";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/subPages/ProductDetails";
import SearchResult from "./pages/subPages/SearchResult";
import NotFound from "./pages/NotFound"; //

import CheckOut from "./pages/subPages/CheckOut";

import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import {useProductsContext } from './context/ProductsContext';

import OrderComplete from "./pages/subPages/OrderComplete";
import ScrollToTop from "./components/ScrollToTop";

import Shawls from "./pages/subPages/Shawls";
import ShippingPolicy from "./pages/subPages/ShippingPolicy";
import RefundPolicy from "./pages/subPages/RefundPolicy";
import PrivacyPolicy from "./pages/subPages/PrivacyPolicy";
import TermsOfService from "./TermsOfService";

function App() {
  const {productsData, newArrivals} = useProductsContext();

  return (
    <ShoppingCartProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element = {<Home productsData = {productsData} newArrivals={newArrivals}/>} />
          <Route path="/our-collections" element = {<OurCollections productsData = {productsData}/>} />
          <Route path="/our-collections/shawls" element={<Shawls/>}/>

          <Route path="/contact-us" element = {<ContactUs/>} />
          <Route path="/checkout" element = {<CheckOut />} />
          <Route path="/product-details/:id" element={<ProductDetails productsData = {productsData}/>} />
          <Route path="/search-results" element = {<SearchResult />}/>
          <Route path="/order-complete" element = {<OrderComplete />}/>
          <Route path="*" element={<NotFound />} />

          <Route path="/shipping-policy" element = {<ShippingPolicy/>} />
          <Route path="/refund-policy" element = {<RefundPolicy/>} />
          <Route path="/privacy-policy" element = {<PrivacyPolicy/>} />
          <Route path="/terms-of-service" element = {<TermsOfService/>} />
        </Routes>
        <Footer />
    </ShoppingCartProvider>
  );
}

export default App;


