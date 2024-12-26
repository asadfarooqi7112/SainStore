import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useMediaQuery } from "../hooks/useMediaQuery";

const RotatingProducts = ({ slides }) => {
  const isSmallDevice = useMediaQuery("(max-width: 768px)");
  const imagesPerView = isSmallDevice ? 2 : 4;

  const totalSlides = [
    ...slides.slice(-imagesPerView),
    ...slides,
    ...slides.slice(0, imagesPerView),
  ];

  const [currentIndex, setCurrentIndex] = useState(imagesPerView);
  const sliderRef = useRef(null);
  const isTransitioning = useRef(false);

  const goToPrevious = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const totalSlideCount = slides.length + imagesPerView * 2;

    const handleTransitionEnd = () => {
      if (currentIndex === 0) {
        // Reset to the last original slide
        sliderRef.current.style.transition = "none";
        setCurrentIndex(slides.length);
      } else if (currentIndex === totalSlideCount - imagesPerView) {
        // Reset to the first original slide
        sliderRef.current.style.transition = "none";
        setCurrentIndex(imagesPerView);
      }
      isTransitioning.current = false;
    };

    const slider = sliderRef.current;
    slider.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      slider.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [currentIndex, slides.length, imagesPerView]);

  useEffect(() => {
    if (sliderRef.current) {
      if (isTransitioning.current) {
        sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      }
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex * 100) / imagesPerView
      }%)`;
    }
  }, [currentIndex, imagesPerView]);

  return (
    <div style={isSmallDevice ? sliderStylesSmallerDevices : sliderStyles}>
      <div onClick={goToPrevious} style={isSmallDevice?leftArrowStyles_smaller_devices:leftArrowStyles} aria-label="Previous slide">
        <FiChevronLeft />
      </div>
      <div onClick={goToNext} style={isSmallDevice?rightArrowStyles_smaller_devices:rightArrowStyles} aria-label="Next slide">
        <FiChevronRight />
      </div>
      <div style={sliderTrackWrapperStyles}>
        <div ref={sliderRef} style={sliderTrackStyles}>
          {totalSlides.map((slide, index) => (
            <div
              key={index}
              style={{
                ...slideStyles,
                width: `${100 / imagesPerView}%`,
              }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingProducts;

const sliderStyles = {
  padding: "0 20px",
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const sliderStylesSmallerDevices = {
  ...sliderStyles,
  height: "50vh",
};

const sliderTrackWrapperStyles = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const sliderTrackStyles = {
  display: "flex",
  transition: "transform 0.5s ease-in-out",
  height: "100%",
};

const slideStyles = {
  flexShrink: 0,
  height: "100%",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "25px",
  color: "black",
  zIndex: 3,
  cursor: "pointer",
  backgroundColor: "white",
  width: "50px",
  height: "50px",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"

};
const leftArrowStyles_smaller_devices = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "12px",
  fontSize: "25px",
  color: "black",
  zIndex: 3,
  cursor: "pointer",
  backgroundColor: "white",
  width: "50px",
  height: "50px",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "25px",
  color: "black",
  zIndex: 3,
  cursor: "pointer",
  backgroundColor: "white",
  width: "50px",
  height: "50px",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const rightArrowStyles_smaller_devices = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "-10px",
  fontSize: "25px",
  color: "black",
  zIndex: 3,
  cursor: "pointer",
  backgroundColor: "white",
  width: "50px",
  height: "50px",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};