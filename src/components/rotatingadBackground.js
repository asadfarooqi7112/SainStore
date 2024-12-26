import { useState, useEffect, useCallback } from "react";
import "./ImageSlider.css";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Define styles before the component
const slideStyles = {
  width: "80vw",
  height: "80vh",
  borderRadius: "10px",
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  position: "relative", // Position relative to overlay the caption
};

const slideStylesSmallDevices = {
  width: "100vw",
  height: "50vh",
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  position: "relative", // Position relative to overlay the caption
};

const slidesWrapperStyles = {
  display: "flex",
  transition: "transform 0.5s ease",
  width: "100%",
  height: "100%",
};

const rightArrowStyles = {
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
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  bottom: "16px",
  width: "100%",
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

const captionStyles = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "5px",
  borderRadius: "5px",
  fontSize: "18px",
};

const RotatingAds = ({ slides, product_id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const titles = ["Power Banks", "Headsets", "Chargers", "Speakers", "Smart Watches", "Stands"];
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
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
    } else if (touchStartX - touchEndX < -50) {
      goToPrevious();
    }
  };

  return (
    <div style={sliderStyles} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div onClick={goToPrevious} style={leftArrowStyles}>
        <FiChevronLeft/>
      </div>
      <div onClick={goToNext} style={rightArrowStyles}>
        <FiChevronRight/>
      </div>

      <div style={slidesWrapperStyles}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...slideStyles,
              display: index === currentIndex ? 'block' : 'none'
            }}
          >
            <img
              src={slide.image_url}
              alt={titles[index]}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
            />
            <div style={captionStyles}>{titles[index]}</div>
          </div>
        ))}
      </div>

      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
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

export default RotatingAds;
