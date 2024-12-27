import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import ImageGallery from '../../components/ImageGallery';
import SubmitReview from '../../components/SubmitReview';
import DisplayReview from '../../components/DisplayReview';
import { supabase } from '../../supabaseClient';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Pagination from '../../components/Pagination';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import "./ProductDetails.css"
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ImageSlider from '../../components/ImageSlider';
import Loading from "../../components/Loading"



const ProductDetails = (props) => {
  const [isWriteReview, setIsWriteReview] = useState(false)
  const [reviewsData, setReviewsData] = useState([]);

  const [focusDiv, setFocusDiv] = useState(false);
  const params = useParams();

  const [totalRating, setTotalRating] = useState(0);
  const [reviewCount, setReviewCount] = useState([0, 0, 0, 0, 0]);

  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems,emptyCart} = useShoppingCart();
  console.log("cartItemsss",cartItems);

  const navigate = useNavigate();

  const quantity = getItemQuantity(params.id)

  const isSmallDevice = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
      async function fetchReviews() {
          const { data } = await supabase
              .from('reviews')
              .select('*')
              .eq('product_id', params.id);

          if (data) {
              setReviewsData(data);

              const total = data.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0);
              setTotalRating(total / data.length);

              const counts = [0, 0, 0, 0, 0];
              data.forEach((item) => {
                  if (item.rating >= 1 && item.rating <= 5) {
                      counts[item.rating - 1] += 1;
                  }
              });

              setReviewCount(counts);
          }
      }

      fetchReviews();
  }, [params.id]);

  const ratingsToStars = Array(5).fill(0).map((item, index) => {
    const number = index + 0.5;
    return (
        <span key={index}>
            {totalRating >= index + 1 ? (
                <FaStar color='orange' />
            ) : totalRating >= number ? (
                <FaStarHalfAlt color='orange' />
            ) : (
                <AiOutlineStar />
            )}
        </span>
    );
});

  function handleIsWriteAReview(){
    setFocusDiv(true)
    setIsWriteReview(prev=>!prev)
  }
  function handleAddToCart(id, color){
    increaseCartQuantity(id,color) 
  }
  function handleRemoveFromCart(id, color){
    removeFromCart(id, color)
  }
  function handleBuyNow(id, color){
    emptyCart()
    increaseCartQuantity(id,color)
    navigate('/checkout');
  }
  const product = props.productsData.find(item => item.product_id === parseInt(params.id));

  if (!product) {
    return <Loading/>;
  }

  return (
    <div className='product_details_page_container '>
      <Helmet>
        <html lang="en" />
        <title>{product.name}</title>
{/*        <meta name="description" content={product.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0,160)} />*/}
        <link rel="canonical" href={`https://www.alcheez.com/product-details/${params.id}`}/>
        <meta name="keywords" content={`${product.name}, buy ${product.name} online, ${product.name} price, alcheez, electronics, headset, headphone, handsfree, earphone, airpods, earbuds, speaker, smart watch, charger, cable, mobile stand, laptop stand, power bank, tech accessories, electronic gadgets, affordable tech, best tech deals, online electronics store`} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* Structured Data JSON-LD */}
         {/*"description": product.description.replace(/<\/?[^>]+(>|$)/g, ""), place it inside */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.productimages.map(img => img.image_url),
           
            "sku": product.sku || params.id,
            "brand": {
              "@type": "Brand",
              "name": "No Brand"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://www.alcheez.com/product-details/${params.id}`,
              "priceCurrency": "PKR",
              "price": product.sale_price || product.price,
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "AlCheez"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": totalRating,
              "reviewCount": reviewsData.length
            },
            "review": reviewsData.map((review) => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.user_name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5"
              },
              "reviewBody": review.review_content
            }))
          })}
        </script>

        {/* OG Tags */}
        {/* https://ogp.me/ */}
        <meta property="og:title" content={product.name} />
        {/*<meta property="og:description" content={product.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0,160)} />*/}
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.productimages[0].image_url} />
        <meta property="og:url" content={`https://www.alcheez.com/product-details/${params.id}`} />
        <meta property="og:price:amount" content={product.sale_price || product.price} />
        <meta property="og:price:currency" content="PKR" />

        {/* Twitter tags */}
        {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content={product.name} />
        {/*<meta property="twitter:description" content={product.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0,160)} />*/}
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={product.productimages[0].image_url} />

        {/* https://moz.com/blog/meta-referrer-tag */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
    <div className='product_details_container'>
      {isSmallDevice 
      ? 
      <div className='p-details-image_container'>
          <ImageSlider slides={product.productimages} product_id={product.product_id} />
      </div>:
      <div className='image_container'>
        <ImageGallery images={product.productimages} />
      </div>}
      <div className='product_info_container'>
        <div className='product_header'>
          <h1 className='product_title'>{product.name}</h1>
          <span style={{display: "block", height: "1px",backgroundColor: "black", width: "100px", margin: "25px 0 10px 0px"}}></span>
          <div>
                {ratingsToStars} {reviewsData.length} reviews
          </div>
          {product.sale_price ? (
            <p className='product_price'>
              Rs.{product.sale_price}{' '}
              <span className='original_price'>Rs. {product.price}</span> -{Math.round((product.price - product.sale_price) * 100 / product.price)}%
            </p>
          ) : (
            <p className='product_price'>Rs.{product.price}</p>
          )}
        </div>
        {cartItems.find(item=>item.id===parseInt(params.id))!== undefined  && <div className='quantity_label'>Quantity:<div className='decrement_quantity' onClick={()=>decreaseCartQuantity(params.id)}>-</div>{quantity}<div className='increment_quantity' onClick={()=>increaseCartQuantity(params.id)}>+</div></div>
        }<div className='button_container'>
          {cartItems.find(item=> item.id===parseInt(params.id))===undefined
          ?
          <button className='add_button_style' onClick={()=>{handleAddToCart(params.id)}}>Add to cart</button>
          :
          <button className='remove_button_style' onClick={()=>{handleRemoveFromCart(params.id)}}>Remove from cart</button>
        }
          <button className='buy_button_style ' onClick={()=>handleBuyNow(params.id)}>Buy Now</button>
        </div>
        <div className='discription_container'>
          <div className='discription_content' dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
      
    </div>
      <div>
        <DisplayReview handleIsWriteAReview={handleIsWriteAReview} isWriteReview={isWriteReview} reviewsData={reviewsData} totalRating={totalRating} reviewCount={reviewCount} ratingsToStars={ratingsToStars} />
      </div>
      {isWriteReview && <div>
        <SubmitReview product_id={product.product_id} setIsWriteReview= {setIsWriteReview} focusDiv={focusDiv} setFocusDiv={setFocusDiv} />
      </div>}
      {reviewsData.length !==0 && <Pagination data = {reviewsData}/>}
    </div>
  );
};

export default ProductDetails;
