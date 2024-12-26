// src/components/ImageGallery.js
import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].image_url);

  const handleImageClick = (image) => {
    setSelectedImage(image.image_url);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start'}}>
      <div style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={`Thumbnail ${index}`}
            onClick={() => handleImageClick(image)}
            style={{
              width: '100px',
              height: '150px',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      <div style={{ marginLeft: '20px' }}>
        <img src={selectedImage} alt="Selected" style={{ width: '550px', height: '800px', marginBottom: '10px',}} />
      </div>
    </div>
  );
};

export default ImageGallery;
