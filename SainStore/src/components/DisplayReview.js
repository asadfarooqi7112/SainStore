import { FaStar} from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import ReviewDistributionBar from "./ReviewDistributionBar"
import "./DisplayReview.css"


export default function DisplayReview({handleIsWriteAReview,isWriteReview, reviewsData,totalRating,reviewCount,ratingsToStars }) {

    return ( 
        <div style={displayReviews_container}>
            <div className='ratings_container'>
           {reviewsData.length ?
            <div style={{lineHeight:"20px"}}>
                <span style={{marginRight:"2px"}}>{ratingsToStars}</span> {totalRating.toFixed(1)} out of 5 <br /> Based on {reviewsData.length} reviews
            </div>:
            <div style={{textAlign:"center"}}>No reviews yet, <br/>be the first one to write a review</div>
            }
                <div>
                    <h1 style={{textAlign:"center"}}>Customer Reviews</h1>
                <div >
                    <div style={{display:"flex"}}>
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' /> 
                        <ReviewDistributionBar count={reviewCount[4]} total={reviewsData.length} />
                    </div>
                    <div style={{display:"flex"}}>
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <AiOutlineStar />
                        <ReviewDistributionBar count={reviewCount[3]} total={reviewsData.length} />
                    </div>
                    <div style={{display:"flex"}}>
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <AiOutlineStar/>
                        <AiOutlineStar/>
                        <ReviewDistributionBar count={reviewCount[2]} total={reviewsData.length} />
                    </div>
                    <div style={{display:"flex"}}>
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <AiOutlineStar />
                        <AiOutlineStar/>
                        <AiOutlineStar/>
                        <ReviewDistributionBar count={reviewCount[1]} total={reviewsData.length} />
                    </div>
                    <div style={{display:"flex"}}>
                        <FaStar color='orange' />
                        <AiOutlineStar/>
                        <AiOutlineStar/>
                        <AiOutlineStar/>
                        <AiOutlineStar/>
                        <ReviewDistributionBar count={reviewCount[0]} total={reviewsData.length} />
                    </div>
                </div>
            </div>
            <button className='write_review_button' onClick={handleIsWriteAReview}>{isWriteReview? "Cancel Review":"Write a review"}</button>
            </div>
        </div>
    );
}

const displayReviews_container ={

}



