import React, { useState,useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

export default function SubmitReview({ focusDiv, setFocusDiv, product_id, setIsWriteReview }) {

  const divRef = useRef(null);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);

  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  useEffect(() => {
    if (focusDiv && divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
      setFocusDiv(false);
    }
  }, [focusDiv, setFocusDiv]);

  function handleClick(index) {
    setCurrentValue(index + 1);
  }

  function handleMouseOver(index) {
    setHoverValue(index + 1);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if(currentValue===0){
        alert("Please select a rating before submitting your review.")
    }
    else{
      const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id: product_id,
          rating: currentValue,
          review_title: reviewTitle,
          review_content: reviewContent,
          user_name: reviewerName
        }
      ]);


    if (error) {
      console.error('Error inserting review:', error);
      // You can add more user-friendly error handling here
    } else {
      console.log('Review inserted successfully:', data);
      // Clear form fields after successful submission
      setCurrentValue(0);
      setHoverValue(0);
      setReviewTitle('');
      setReviewContent('');
      setReviewerName('');
      setIsWriteReview(false)
    }
    }
  }

  return (
    <form style={styles.reviewRatingContainer} onSubmit={handleSubmit} ref={divRef}>
      <h2 style={styles.heading}>Write a review</h2>
      <p style={styles.label}>Rating</p>
      <div style={styles.starContainer}>
        {Array(5).fill(0).map((_, index) => (
          <FaStar
            key={index}
            size={24}
            style={{
              marginRight: '5px',
              cursor: 'pointer',
              color: (hoverValue || currentValue) > index ? 'orange' : 'gray',
            }}
            onClick={() => handleClick(index)}
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={() => setHoverValue(0)}
          />
        ))}
      </div>
      <p style={styles.label}>Review Title</p>
      <input type="text" style={styles.input} value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} required/>
      <p style={styles.label}>Review</p>
      <textarea style={styles.textarea} value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} required></textarea>
      <p style={styles.label}>Name</p>
      <input type="text" style={styles.input} value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required/>
      <div style={styles.buttonContainer}>
        <button type="button" style={{ ...styles.button, ...styles.cancelButton }} onClick={() => {setIsWriteReview(false)}}>Cancel Review</button>
        <button type='submit' style={{ ...styles.button, ...styles.submitButton }}>Submit Review</button>
      </div>
    </form>
  );
}

const styles = {
  reviewRatingContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: 'auto',
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    margin: '10px 0 5px 0',
    fontWeight: 'bold',
  },
  starContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #a9a9a9',
    borderRadius: '5px',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #a9a9a9',
    borderRadius: '5px',
    marginBottom: '20px',
    height: '100px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: 'gray',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
};
