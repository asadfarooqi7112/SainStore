/**
 * In this component we are fetching product data from our database and 
 * creating a context for providing this data to the entire application.
 * 
 * - `ProductsProvider` fetches the product data from the database using Supabase.
 * - It stores the data in a state variable and provides it via context.
 * - Components can consume this context using `useProductsContext` to access product data.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ProductsContext = createContext();

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [productColors, setProductColors] = useState([]);

  const [searchResult, setSearchResult] = useState([]);
  const [searchWord, setSearchWord] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, productimages!inner(image_url)')
        .order('product_id');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProductsData(data);
      }
    };

    fetchProducts();

    const fetchNewArrivals = async () => {
        const { data, error } = await supabase
        .from('products')
        .select('*, productimages!inner(image_url)') // Match fetchProducts query
        .order('created_at', { ascending: false })
        .limit(3);

        if (error) {
            console.error('Error fetching new arrivals:', error.message);
            return;
        }else{
          setNewArrivals(data);
      }
  };

  fetchNewArrivals();

  const fetchProductColors = async () => {
    const { data, error } = await supabase
      .from('productcolors')
      .select('*')
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProductColors(data);
    }
  };

  fetchProductColors();

  }, []);


  return (
    <ProductsContext.Provider value={{productsData,newArrivals, productColors, setSearchResult, searchResult, setSearchWord, searchWord}} >
      {children}
    </ProductsContext.Provider>
  );
};
