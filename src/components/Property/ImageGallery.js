import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = () => {
    setShowFullscreen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div 
        className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
        onClick={toggleFullscreen}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Property view ${currentImageIndex + 1}`}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
              index === currentImageIndex ? 'ring-2 ring-purple-500' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Property view ${index + 1}`}
              className="w-full h-24 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <CloseIcon fontSize="large" />
          </button>

          <button
            onClick={previousImage}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
          >
            <ArrowBackIosIcon fontSize="large" />
          </button>

          <img
            src={images[currentImageIndex]}
            alt={`Property view ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
          >
            <ArrowForwardIosIcon fontSize="large" />
          </button>

          {/* Fullscreen Thumbnails */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
