import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading';

export default function SearchResult() {
    const { productsData, setSearchWord } = useProductsContext();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Get query from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || "";

    useEffect(() => {
        // Perform search when component mounts or when query changes
        if (productsData.length > 0) {
            const filteredResults = productsData.filter((data) => 
                data.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResult(filteredResults);
            setSearchWord(query);
            setLoading(false);
        }
    }, [query, productsData, setSearchWord]);

    const searchedDataCardsArray = searchResult.map((item, index) => (
        <ProductCard key={index} data={item} />
    ));

    return (
        <div className='search-result_container'>
            <Helmet>
                <html lang="en" />
                <title>{`Search: ${searchResult.length} results for "${query}" | AlCheez`}</title>
                <meta name="description" content={`Search results for "${query}" on AlCheez. Find the best electronics products based on your query.`} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://alcheez.com/search-results?query=${encodeURIComponent(query)}`} />
                <meta name="keywords" content={`alcheez, electronics, search results, ${query}`} />
                <link rel="icon" href="https://alcheez.com/favicon.ico" />

                {/* OG Tags */}
                <meta property="og:url" content={`https://alcheez.com/search-results?query=${encodeURIComponent(query)}`} />
                <meta property="og:title" content={`Search: ${searchResult.length} results for "${query}" | AlCheez`} />
                <meta property="og:description" content={`Search results for "${query}" on AlCheez. Find the best electronics products based on your query.`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />

                {/* Twitter tags */}
                <meta property="twitter:site" content="@AlCheez" />
                <meta property="twitter:title" content={`Search: ${searchResult.length} results for "${query}" | AlCheez`} />
                <meta property="twitter:description" content={`Search results for "${query}" on AlCheez. Find the best electronics products based on your query.`} />
                <meta property="twitter:creator" content="@AlCheez" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content="https://alcheez.com/android-chrome-384x384.png"  />

                <meta name="referrer" content="origin-when-crossorigin" />
            </Helmet>
            <div className='result_container'>
                <h1>Search results: "{query}"</h1>
                <div className='s-card_container'>
                    {loading ? <Loading /> : 
                        (searchResult.length > 0 ? searchedDataCardsArray : <h3 className="no-results">No results found for "{query}"</h3>)
                    }
                </div>
            </div>
        </div>
    );
}
