import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useMediaQuery } from "../hooks/useMediaQuery";

const ImageSlider = ({ slides }) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSmallDevice = useMediaQuery("(max-width: 768px)");

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 10000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div style={isSmallDevice ? sliderStylesSmallerDevices : sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles} aria-label="Previous slide">
          <FiChevronLeft />
        </div>
        <div onClick={goToNext} style={rightArrowStyles} aria-label="Next slide">
          <FiChevronRight />
        </div>
      </div>
      <div style={fadeContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            style={{
              ...fadeSlideStyles,
              ...(currentIndex === slideIndex && activeFadeSlideStyles),
              backgroundImage: `url(${slide.url})`,
            }}
          ></div>
        ))}
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
            style={{
              ...(isSmallDevice ? dotStyleSmallerDevices : dotStyle),
              ...(currentIndex === slideIndex && { color: "black" }),
            }}
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

const sliderStyles = {
  position: "relative",
  width: "98.70vw",
  height: "100vh",
};

const sliderStylesSmallerDevices = {
  position: "relative",
  width: "98.70vw",
  height: "50vh",
};

const fadeContainerStyles = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const fadeSlideStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: 0,
  transition: "opacity 1s ease-in-out",
  zIndex: 1,
};

const activeFadeSlideStyles = {
  opacity: 1,
  zIndex: 2,
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "25px",
  color: "black",
  zIndex: 3, // Higher than slides
  cursor: "pointer",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "25px",
  color: "black",
  zIndex: 3, // Higher than slides
  cursor: "pointer",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  bottom: "10px",
  width: "100%",
  zIndex: 3, // Higher than slides to avoid fading
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  color: "gray",
};

const dotStyleSmallerDevices = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "10px",
  color: "gray",
};
