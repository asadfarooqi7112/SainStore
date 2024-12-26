import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard(props) {
    const navigate = useNavigate();

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    
    return (
        <div className='p-card_container'
            onClick={() => navigate(`/product-details/${props.data.product_id}`)}
        >
            <div
            className='p-card-image_container'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ width: "100%", height: "100%", position: "relative", marginBottom: "10px" }}
            >
            <img
                src={props.data.productimages[0]?.image_url}
                alt="Product"
                className={`product-image ${hovered ? 'fade-out' : 'fade-in'}`}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: hovered ? 0 : 1,
                }}
            />
            <img
                src={props.data.productimages[1]?.image_url}
                alt="Product Hover"
                className={`product-image ${hovered ? 'fade-in' : 'fade-out'}`}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: hovered ? 1 : 0,
                }}
            />
            </div>
 
            {props.data.sale_price ? 
            <div className='product_details'>
                <p className='product_name'>{props.data.name}</p>
                <p className='sale_price'>Rs. {props.data.sale_price}</p>
                <p className='p-original_price'>
                    <span className='line_through'>Rs. {props.data.price}</span> -{Math.round((props.data.price - props.data.sale_price) * 100 / props.data.price)}%
                </p>
                {props.data.sale_price>=1000 && <p style={{ color: 'green', fontSize: '16px' }}>Free Shipping</p>}
            </div>
            :
            <div className='product_details'>
                <p className='product_name'>{props.data.name}</p>
                <p className='price'>Rs. {props.data.price}</p>
                {props.data.sale_price>=1000 && <p style={{ color: 'green', fontSize: '16px' }}>Free Shipping</p>}
            </div>
            }
        </div>
    );
}

