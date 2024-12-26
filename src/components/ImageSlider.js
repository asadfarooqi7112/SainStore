import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ImageSlider.css";
import {useMediaQuery} from "../hooks/useMediaQuery";

const ImageSlider = ({ slides, product_id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const navigate = useNavigate();
  
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    if (!isFirstSlide) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    if (!isLastSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      goToNext();
    }

    if (touchStartX - touchEndX < -50) {
      goToPrevious();
    }
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].image_url})`,
  };

  return (
    <div 
      style={sliderStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/*<div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div> */}
      <div style={slideStylesWidthBackground} onClick={() => navigate(`/product-details/${product_id}`)}></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={
              slideIndex === currentIndex 
                ? (isSmallDevice ? dotStyleSmallDevicesActive : dotStyleActive)
                : (isSmallDevice ? dotStyleSmallDevices : dotStyle)
            }
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

/*const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "16px",
  fontSize: "45px",
  color: "blue",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "16px",
  fontSize: "45px",
  color: "blue",
  zIndex: 1,
  cursor: "pointer",
};*/

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  color: "gray",
};

const dotStyleActive = {
  ...dotStyle,
  color: "black",
};

const dotStyleSmallDevices = {
  margin: "10px 3px",
  cursor: "pointer",
  fontSize: "10px",
  color: "gray",
};

const dotStyleSmallDevicesActive = {
  ...dotStyleSmallDevices,
  color: "black",
};
