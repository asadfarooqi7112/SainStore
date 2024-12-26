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
        </Routes>
        <Footer />
    </ShoppingCartProvider>
  );
}

export default App;


