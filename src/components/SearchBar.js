import React, { useState, useEffect, useRef } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css'; 
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';

import { Offcanvas, Stack, Button } from 'react-bootstrap'

export default function SearchBar() {
    const { productsData, setSearchResult, setSearchWord } = useProductsContext();

    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const [result, setResult] = useState([]);
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    const isSmallDevice = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [input]);

    useEffect(() => {
        const filteredResults = productsData.filter((data) => {
            return debouncedInput && data.name.toLowerCase().includes(debouncedInput.toLowerCase());
        });
        setResult(filteredResults);  
    }, [debouncedInput, productsData]);

    function handleSelectedResult(id) {
        navigate(`/product-details/${id}`);
        navigate(0);
        setInput("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            window.fbq('track', 'Search', {search_string: input});
            navigate(`/search-results?query=${encodeURIComponent(input)}`);
            setSearchResult(result);
            setSearchWord(input);
        }
    };

    return (
        <div className="search-bar-container" ref={searchBarRef}>
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '5px' }}>
                <FiSearch size={20} className="search-bar-icon" onClick={() => {
                    setIsSearchOpen(true)
                }} />
            </div>
            <Offcanvas show={isSearchOpen}  onHide={()=>setIsSearchOpen(false)} placement='end' style={{width: isSmallDevice ? "250px" : ""}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack style={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '5px' }}>
                        <input 
                            className="search-bar-input"
                            placeholder='Type to search' 
                            value={input} 
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                        <Button style={{marginTop:"10px", width:"100%", height:"60px", backgroundColor:"black"}} onClick={() => {
                            navigate(`/search-results?query=${encodeURIComponent(input)}`);
                            setSearchResult(result);
                            setSearchWord(input);
                            setIsSearchOpen(false)
                            }}>
                            Search
                        </Button>
                        <div style={{padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop:"25px"}}>
                            {result.map((data, index) => (
                                <div className='search_results' onClick={() => handleSelectedResult(data.product_id)}>
                                    <img src={data.productimages[0].image_url} alt="Example" className = "searchImages" />
                                    <p 
                                        key={index} 
                                        style={{margin: "0px", marginTop:"20px", textAlign: "center"}}
                                    >
                                        {data.name}
                                    </p>
                                    <p style={{margin: "0px", textAlign: "center", fontWeight:"bold"}}>
                                        Rs.{data.sale_price?data.sale_price:data.price}
                                    </p>
                                    
                                </div>
                            ))}
                        </div>
                   </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
